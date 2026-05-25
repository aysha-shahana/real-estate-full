import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/xen-logo.png";

import styles from '../assets/Navbar.module.css';
const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbarCustom sticky-top ${styles.navbarCustom}`}>
      <div className="container">

        <Link className={`navbar-brand text-light ${styles.navBrand}`} to="/">
         <img src={logo} alt="company logo" style={{width: '100px'}} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">

          <ul className="navbar-nav mx-auto gap-3 align-items-center">
            <li className={styles.navlink}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.navlink}>
              <Link to="/sell">Sell</Link>
            </li>
            <li className={styles.navlink}>
              <Link to="/rent">Rent</Link>
            </li>
            <li className={styles.navlink}>
              <Link to="/buy">Buy</Link>
            </li>
           
            <li className={styles.navlink}>
              <Link to="/agency">Agency</Link>
            </li>
            <li className={styles.navlink}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <div className="d-grid gap-3 d-md-flex g-2">
            <Link to="/SignIn">
              <button className={styles.button}>Signin</button>
            </Link>

            <Link to="/SignUp">
              <button className={styles.buttons}>SignUp</button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

