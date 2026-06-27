import React, { useState, useEffect } from "react";
import api from "../../assets/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import QuickPropertyForm from "./QuickPropertyForm";
import styles from "../../assets/UserDashboard.module.css";

const AddProperty = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    navigate("/signin");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/current-user/");
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* SIDEBAR */}

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/xen-logo.png" alt="logo" />
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
          <h3>{userData?.username || "User"}</h3>
          <p>Property Owner</p>
        </div>

        <ul className={styles.menu}>
          <li onClick={() => navigate("/dashboard")}>
            <FaHome />
            Dashboard
          </li>

          <li onClick={() => navigate("/my-properties")}>
            <FaBuilding />
            My Properties
          </li>

          <li className={styles.active}>
            <FaPlusCircle />
            Add Property
          </li>

          <li onClick={() => navigate("/visit-requests")}>
            <FaBuilding />
            Visit Requests
          </li>

          <li onClick={() => navigate("/contact-leads")}>
            <FaUser />
            Contact Leads
          </li>

          <li onClick={() => navigate("/profile")}>
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
            <h2>Add Property</h2>
            <p>Create a new property listing</p>
          </div>
        </div>

        <QuickPropertyForm />
      </main>
    </div>
  );
};

export default AddProperty;
