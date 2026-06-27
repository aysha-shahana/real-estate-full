import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../assets/axiosConfig";
import styles from "../../assets/UserDashboard.module.css";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
 
} from "react-icons/fa";

function ContactLeads() {

  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await api.get(
          "http://127.0.0.1:8000/api/current-user/",
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

       
   },[]);

  const fetchLeads = async () => {

    try {

      const res = await api.get(
        "/my-contact-leads/"
      );

      setLeads(res.data);

    } catch (error) {

      console.log(error);

    }
  };

   const handleLogout = () => {
  localStorage.clear();
  navigate("/signin");
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
         <li onClick={() => navigate("/dashboard")}>
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

          <li
  className={styles.active}
  onClick={() => navigate("/contact-leads")}
>
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
              <h2>Contact Leads</h2>
  
  <p>Users who requested your contact details.</p>          
            </div>
          </div>


<div className={styles.tableCard}>
  <div className={styles.tableHeader}>
    <h3>Contact Leads</h3>
  </div>

  <table className={styles.table}>
    <thead>
      <tr>
        <th>Property</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      {leads.length > 0 ? (
        leads.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.property_title}</td>

            <td>{lead.customer_name}</td>

            <td>{lead.customer_phone}</td>

            <td>
              {new Date(
                lead.created_at
              ).toLocaleDateString()}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">
            No contact leads found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</main>


</div>
  );
}

export default ContactLeads;