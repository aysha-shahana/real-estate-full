import React from "react";

import styles from "../assets/Profile.module.css";

function Profile() {

  const username =
    localStorage.getItem("username");

  return (

    <div className={styles.profilePage}>

      <div className={styles.profileCard}>

        {/* TOP */}

        <div className={styles.topSection}>

          <div className={styles.avatar}>
            <i className="bi bi-person-fill"></i>
          </div>

          <h2>
            {username || "User"}
          </h2>

          <p>
            Welcome to your profile
          </p>

        </div>

        {/* DETAILS */}

        <div className={styles.infoSection}>

          <div className={styles.infoBox}>

            <span>
              Username
            </span>

            <h4>
              {username || "Not Found"}
            </h4>

          </div>

          <div className={styles.infoBox}>

            <span>
              Account Type
            </span>

            <h4>
              Property User
            </h4>

          </div>

          <div className={styles.infoBox}>

            <span>
              Status
            </span>

            <h4 className={styles.active}>
              Active
            </h4>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;