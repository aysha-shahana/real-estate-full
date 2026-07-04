import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";

import React, { useEffect, useState } from "react";

import api from "../../assets/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

import styles from "../../assets/UserDashboard.module.css";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    api
      .get("/user-dashboard/")
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await api.get("/current-user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div className={styles.dashboard}>
      {/* SIDEBAR */}

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link className={styles.navBrand} to="/">
            <img src="/xen-logo.png" alt="company logo" />
          </Link>
        </div>

        {/* PROFILE */}

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

        {/* MENU */}

        <ul className={styles.menu}>
          <li className={styles.active}>
            <FaHome />
            Dashboard
          </li>

          <li onClick={() => navigate("/my-properties")}>
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

      {/* MAIN CONTENT */}

      <main className={styles.main}>
        {/* TOPBAR */}

        <div className={styles.topbar}>
          <div>
            <p>
              <Link to="/" className={styles.homeLink}>
                <FaHome /> Home
              </Link>{" "}
              / Dashboard
            </p>
            <h2>Dashboard</h2>

            <p>Welcome back, {userData?.username || "User"}</p>
          </div>

          <div className={styles.topActions}>
            <div className={styles.searchBox}>
              <FaSearch />

              <input type="text" placeholder="Search properties..." />
            </div>

            <div className={styles.notification}>
              <FaBell />
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <div>
              <h3>{dashboardData?.total_properties}</h3>

              <p>Total Properties</p>
            </div>
          </div>

          <div className={styles.card}>
            <div>
              <h3>{dashboardData?.active_properties}</h3>

              <p>Active Listings</p>
            </div>
          </div>

          <div className={styles.card}>
            <div>
              <h3>{dashboardData?.sold_properties}</h3>

              <p>Sold Properties</p>
            </div>
          </div>

          <div className={styles.card}>
            <div>
              <h3>{dashboardData?.enquiries}</h3>

              <p>Property Enquiries</p>
            </div>
          </div>
        </div>

        {/* RECENT PROPERTIES */}

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h3>Recent Properties</h3>

            <button>View All</button>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Property</th>

                <th>Type</th>

                <th>Status</th>

                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData?.recent_properties?.map((property, index) => (
                <tr key={index}>
                  <td>{property.title}</td>

                  <td>{property.property_type}</td>

                  <td>
                    <span
                      className={
                        property.status === "available"
                          ? styles.activeStatus
                          : property.status === "pending"
                            ? styles.pendingStatus
                            : styles.soldStatus
                      }
                    >
                      {property.status}
                    </span>
                  </td>

                  <td>₹ {property.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
