import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import logo from "../../public/xen-logo.png";

import styles from "../assets/Navbar.module.css";

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [scrolled, setScrolled] =
    useState(false);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  // CHECK PAGE

  const isAddPropertyPage =
    location.pathname === "/add-property";

  // SCROLL EFFECT

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 80) {

        setScrolled(true);

      } else {

        setScrolled(false);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);

  // LOGIN CHECK

  const token =
    localStorage.getItem(
      "access_token"
    );

  // USERNAME

  const username =
    localStorage.getItem("username");

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );

    localStorage.removeItem(
      "username"
    );

    navigate("/");
  };

  // ADD PROPERTY

  const handleAddProperty = () => {

    if (token) {

      navigate("/add-property");

    } else {

      navigate("/signin", {
        state: {
          from: "/add-property",
        },
      });
    }
  };

  // DROPDOWN ROUTE

  const handleProtectedRoute = (path) => {

    if (token) {

      navigate(path);

    } else {

      navigate("/signin", {
        state: {
          from: path,
        },
      });
    }
  };

  return (

    <nav
      className={`
        navbar
        navbar-expand-lg
        fixed-top
        ${styles.navbarCustom}
        ${
          scrolled || isAddPropertyPage
            ? styles.scrolled
            : ""
        }
      `}
    >

      <div className="container">

        {/* LOGO */}

        <Link
          className={`navbar-brand ${styles.navBrand}`}
          to="/"
        >

          <img
            src={logo}
            alt="company logo"
          />

        </Link>

        {/* TOGGLER */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >

          <span className="navbar-toggler-icon"></span>

        </button>

        {/* NAVBAR */}

        <div
          className="collapse navbar-collapse"
          id="nav"
        >

          {/* LINKS */}

          <ul className="navbar-nav mx-auto gap-lg-4 align-items-lg-center">

            <li className={styles.navlink}>
              <Link to="/">Home</Link>
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

          {/* RIGHT SECTION */}

          <div className="d-flex align-items-center gap-3">

            {/* ADD PROPERTY */}

            <button
              onClick={handleAddProperty}
              className={styles.addPropertyBtn}
            >

              Add Property

            </button>

            {/* USER MENU */}

            <div className={styles.userMenu}>

              <div
                className={styles.userBox}
                onClick={() =>
                  setDropdownOpen(
                    !dropdownOpen
                  )
                }
              >

                <div className={styles.userIcon}>
                  <i className="bi bi-person"></i>
                </div>

                <div className={styles.userText}>

                  {token ? (
                    <>
                      <span>
                        {username || "User"}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Sign In
                      </span>
                    </>
                  )}

                </div>

              </div>

              {/* DROPDOWN */}

              {dropdownOpen && (

                <div className={styles.dropdown}>

                  <div
                    onClick={() =>
                      handleProtectedRoute(
                        "/profile"
                      )
                    }
                  >
                    Profile
                  </div>

                 <div
  onClick={() => {

    if (token) {

      window.location.href =
        "http://127.0.0.1:8000/" ,  "_blank";

    } else {

      navigate("/signin", {
        state: {
          from: "/dashboard",
        },
      });
    }

  }} 
>
  My Dashboard 
</div>

                  <div
                    onClick={() =>
                      handleProtectedRoute(
                        "/my-property"
                      )
                    }
                  >
                    My Property
                  </div>

                  {token && (

                    <div
                      onClick={logout}
                    >
                      Logout
                    </div>

                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;