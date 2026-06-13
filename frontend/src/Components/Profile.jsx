import React, { useState, useEffect } from "react";
import api from "../assets/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import styles from "../assets/UserDashboard.module.css";

function Profile() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "User";

const [editModal, setEditModal] = useState(false);

const [userData, setUserData] = useState(null);


const [editData, setEditData] = useState({
  username: "",
  first_name: "",
  email: "",
  phone: "",
  profile_image: null,
});

  const [passwordData, setPasswordData] =
    useState({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

  const openEditProfile = () => {
  setEditData({
    username: userData?.username || "",
    first_name: userData?.first_name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    profile_image: null,
  });

  setEditModal(true);
};

  useEffect(() => {
    fetchUser();
  }, []);

const fetchUser = async () => {
  try {
    const response = await api.get("/current-user/");
    setUserData(response.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

const handleEditChange = (e) => {
  setEditData({
    ...editData,
    [e.target.name]: e.target.value,
  });
};

const handleImageChange = (e) => {
  setEditData({
    ...editData,
    profile_image: e.target.files[0],
  });
};

  const submitPasswordChange = async () => {
    if (
      passwordData.new_password !==
      passwordData.confirm_password
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post(
        "/change-password/",
        {
          old_password:
            passwordData.old_password,
          new_password:
            passwordData.new_password,
        }
      );

      alert(
        "Password changed successfully"
      );

     setEditModal(false);

      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
  console.log(error.response?.data); 

  alert(
    error.response?.data?.error ||
    "Failed to change password"
  );
}
  };



          
const updateProfile = async () => {
  const formData = new FormData();

  formData.append("username", editData.username);
  formData.append("first_name", editData.first_name);
  formData.append("email", editData.email);
  formData.append("phone", editData.phone);

  if (editData.profile_image) {
    formData.append("profile_image", editData.profile_image);
  }

  try {
    await api.put("/update-profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Profile updated successfully");
    setEditModal(false);
    fetchUser(); // refresh data
  } catch (err) {
    alert("Failed to update profile");
  }
};

  return (
    <div className={styles.dashboard}>
      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src="/xen-logo.png"
              alt="logo"
            />
          </Link>
        </div>

        <div className={styles.profileSection}>
          <img
  src={
    userData?.profile_image
      ? userData.profile_image
      : "/default-avatar.png"
  }
  alt="profile"
  className={styles.profileImage}
/>

          <h3>{username}</h3>
          <p>Property Owner</p>
        </div>

        <ul className={styles.menu}>
          <li
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <FaHome />
            Dashboard
          </li>

          <li
            onClick={() =>
              navigate("/my-properties")
            }
          >
            <FaBuilding />
            My Properties
          </li>

          <li
            onClick={() =>
              navigate("/add-property")
            }
          >
            <FaPlusCircle />
            Add Property
          </li>

          <li className={styles.active}>
            <FaUser />
            Profile
          </li>

          <li onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div>
            <h2>My Profile</h2>
            <p>
              Manage account information
            </p>
          </div>
        </div>

        <div
          className={styles.profileContainer}
        >
          <div
            className={styles.profileHeader}
          >
<img
  src={
    userData?.profile_image
      ? userData.profile_image
      : "/default-avatar.png"
  }
  alt="profile"
  className={styles.profileImageLarge}
/>

            <div>
             <h2>
  {userData?.first_name || userData?.username || "User"}
</h2>

              <p>Property Owner</p>
            </div>
          </div>

          <div
            className={styles.profileGrid}
          >
            {/* <div
              className={styles.infoCard}
            >
              <span>Name</span>

              <h4>
                {userData.first_name ||
                  "Not Set"}
              </h4>
            </div> */}

            <div
              className={styles.infoCard}
            >
              <span>Username</span>

              <h4>
                {userData?.username}
              </h4>
            </div>

            <div
              className={styles.infoCard}
            >
              <span>Email</span>

              <h4>
                {userData?.email}
              </h4>
            </div>



            <div
              className={styles.infoCard}
            >
              <span>
                Properties Added
              </span>

              <h4>
                {
                  userData?.property_count
                }
              </h4>
            </div>

            <div
              className={styles.infoCard}
            >
              <span>Password</span>

              <h4>
                ********
              </h4>
            </div>

    <div className={styles.infoCard}>
  <span>Phone Number</span>
  <h4>{userData?.phone || "Not Set"}</h4>
</div>
          </div>

          <div
            className={
              styles.profileActions
            }
          >
           <button
  className={styles.changePassBtn}
  onClick={openEditProfile}
>
  Edit Profile
</button>
          </div>
        </div>
      </main>


      {/* EDIT PROFILE MODAL */}
{editModal && (
  <div className={styles.modalOverlay}>
    <div className={styles.passwordModal}>
      <h3>Edit Profile</h3>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={editData.username}
        onChange={handleEditChange}
      />

      <input
        type="text"
        name="first_name"
        placeholder="Full Name"
        value={editData.first_name}
        onChange={handleEditChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={editData.email}
        onChange={handleEditChange}
      />

      <input
  type="text"
  name="phone"
  placeholder="Phone Number"
  value={editData.phone}
  onChange={handleEditChange}
/>

      <label>Profile Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      <hr />

      <h4>Change Password</h4>

      <input
        type="password"
        name="old_password"
        placeholder="Current Password"
        value={passwordData.old_password}
        onChange={handlePasswordChange}
      />

      <input
        type="password"
        name="new_password"
        placeholder="New Password"
        value={passwordData.new_password}
        onChange={handlePasswordChange}
      />

      <input
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={passwordData.confirm_password}
        onChange={handlePasswordChange}
      />

      <div className={styles.modalButtons}>
        <button
          className={styles.cancelBtn}
          onClick={() => setEditModal(false)}
        >
          Cancel
        </button>

        <button
          className={styles.submitBtn}
          onClick={updateProfile}
        >
          Save Profile
        </button>

        <button
          className={styles.submitBtn}
          onClick={submitPasswordChange}
        >
          Update Password
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;