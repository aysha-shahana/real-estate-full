import React, { useEffect, useState } from "react";
import api from "../../assets/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import styles from "../../assets/UserDashboard.module.css";

const MyProperties = () => {
  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get("/my-properties/");

      setProperties(response.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const deleteProperty = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/properties/${id}/delete/`);

      setProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await api.get(
          "/current-user/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

    api
      .get("/user-dashboard/")
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className={styles.dashboard}>
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

          <li className={styles.active}>
            <FaBuilding />
            My Properties
          </li>

          <li onClick={() => navigate("/add-property")}>
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

      <main className={styles.main}>
        <div className={styles.topbar}>
          <div>
            <h2>My Properties</h2>
            <p>Manage your listings</p>
          </div>
        </div>

        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>
                    <img
                      src={`${DJANGO_BASE_URL}${property.image}`}
                      alt={property.title}
                      width="80"
                    />
                  </td>

                  <td>{property.title}</td>
                  <td>₹ {property.price}</td>
                  <td>{property.listing_type}</td>
                  <td>{property.status}</td>

                  <td>
                    <button
                      className={styles.editBtn}
                      onClick={() => navigate(`/edit-property/${property.id}`)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteProperty(property.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyProperties;
