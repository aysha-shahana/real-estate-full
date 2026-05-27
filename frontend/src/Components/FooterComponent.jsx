import React from "react";
import { Link } from "react-router-dom";

import footer from "../assets/FooterComponent.module.css";

import logo from "../../public/xen-logo.png";

const FooterComponent = () => {

  return (

    <footer className={footer.footerWrapper}>

      <div className="container">

        {/* TOP AREA */}

        <div className={footer.topSection}>

          {/* LOGO + ABOUT */}

          <div>

            <img
              src={logo}
              alt="company logo"
              className={footer.logo}
            />

            <p className={footer.about}>
              Discover premium properties,
              trusted agents, and modern
              real-estate solutions all in
              one place.
            </p>

            {/* SOCIAL */}

            <div className={footer.socialWrapper}>

              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h4 className={footer.heading}>
              Quick Links
            </h4>

            <ul className={footer.list}>

              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/buy">
                  Buy
                </Link>
              </li>

              <li>
                <Link to="/rent">
                  Rent
                </Link>
              </li>

              <li>
                <Link to="/agency">
                  Agency
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* PROPERTY TYPES */}

          <div>

            <h4 className={footer.heading}>
              Property Types
            </h4>

            <ul className={footer.list}>

              <li>Apartment</li>

              <li>Villa</li>

              <li>Commercial</li>

              <li>Luxury Homes</li>

              <li>Beach House</li>

            </ul>

          </div>

          {/* CONTACT */}

          <div>

            <h4 className={footer.heading}>
              Contact
            </h4>

            <ul className={footer.contactList}>

              <li>
                <i className="bi bi-envelope"></i>
                support@xenestate.com
              </li>

              <li>
                <i className="bi bi-telephone"></i>
                +91 98765 43210
              </li>

              <li>
                <i className="bi bi-geo-alt"></i>
                Kochi, Kerala, India
              </li>

            </ul>

          </div>

          {/* NEWSLETTER */}

          <div>

            <h4 className={footer.heading}>
              Newsletter
            </h4>

            <p className={footer.newsText}>
              Subscribe for latest property
              updates and offers.
            </p>

            <div className={footer.newsletter}>

              <input
                type="email"
                placeholder="Enter your email"
              />

              <button>
                Subscribe
              </button>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className={footer.bottomSection}>

          <p>
            © 2026 XenEstate.
            All rights reserved.
          </p>

          <div className={footer.bottomLinks}>

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default FooterComponent;