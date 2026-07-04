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
 

function VisitRequest() {

  const [visits, setVisits] = useState([]);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [totalVisits, setTotalVisits] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchVisits();
  }, []);

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

    
  }, []);

  const updateStatus = async (
  id,
  status
) => {

  try {

    await api.patch(
      `/visit-request/${id}/status/`,
      {
        status,
      }
    );

    fetchVisits();

  } catch (error) {

    console.log(error);

  }
};
  

 const fetchVisits = async () => {
  try {
    const res = await api.get(
      "/my-property-visits/"
    );

    setVisits(res.data.visits);
    setTotalVisits(res.data.total_visits);

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

          <li  className={styles.active} onClick={() => navigate("/visit-requests")}>
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
            <h2>Visit Requests</h2>

<p>Manage visit requests from interested buyers.</p>          
          </div>
        </div>

<div
  className="d-flex justify-content-between align-items-center mb-4"
>
  <div className={styles.card}>
    <h3>{totalVisits}</h3>
    <p>Total Visit Requests</p>
  </div>

  <div className={styles.searchBox}>
    <input
      type="text"
      placeholder="Search visitor..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />
  </div>
</div>

        {/* RECENT PROPERTIES */}

       <div className={styles.tableCard}>
  <div className={styles.tableHeader}>
    <h3>Visit Requests</h3>
  </div>

  <table className={styles.table}>
    <thead>
      <tr>
        <th>Property</th>
        <th>Name</th>
        <th>Phone</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {visits.length > 0 ? (
        visits.map((visit) => (
          <tr key={visit.id}>
            <td>{visit.property_title}</td>

            <td>{visit.name}</td>

            <td><a href={`tel:${visit.phone}`}>
  {visit.phone}
</a></td>

            <td>{visit.visit_date}</td>

            <td>{visit.visit_time}</td>

           <td>

<span
className={`badge ${
visit.status === "approved"
? "bg-success"
: visit.status === "rejected"
? "bg-danger"
: "bg-warning text-dark"
}`}
>

{visit.status}

</span>

</td>
            <td>

  {visit.status ===
  "pending" ? (
    <>

      <button
        className="btn btn-success btn-sm me-2"
        onClick={() =>
          updateStatus(
            visit.id,
            "approved"
          )
        }
      >
        Approve
      </button>

      <button
        className="btn btn-danger btn-sm"
        onClick={() =>
          updateStatus(
            visit.id,
            "rejected"
          )
        }
      >
        Reject
      </button>

    </>
  ) : (

    <span>
      {visit.status}
    </span>

  )}

</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">
            No visit requests found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
      </main>
    </div>
  );
};

export default VisitRequest;
