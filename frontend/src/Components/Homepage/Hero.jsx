import React from "react";
import forimage from "../../assets/Imges/forimage.jpg";

import styles from "../../assets/Hero.module.css";

const Hero = () => {
  return (
    <section className={`${styles.hero} position-relative`}>
      <div className="container">

        {/* ⭐ HERO HEADING */}
        <div className="row text-center text-md-start pt-5">
          <div className="col-md-8 mx-auto">
            <h1 className={`${styles.herosec} text-light fw-bold`}>
              Explore. Buy. Sell. Rent. All in One Place.
            </h1>

            <p className="text-white-50 mt-2 fs-5">
              Find your dream property with ease — trusted listings, verified agents, and smart search tools.
            </p>
          </div>
        </div>

        {/* 🔍 INPUT SECTION */}
        <div className={`${styles.inputese} mt-4`}>
          <div className="p-4 rounded shadow-sm bg-white bg-opacity-25">
            <div className="row g-3">

              {/* Keyword */}
              <div className="col-12 col-md-3 position-relative">
                <p className="mb-1 text-white">Keyword</p>
                <input
                  type="text"
                  className={`form-control ${styles.inputWithIcon}`}
                  placeholder="Enter Keyword"
                />
                <i className={`bi bi-search ${styles.inputIcon}`}></i>
              </div>

              {/* Status */}
              <div className="col-12 col-md-3">
                <p className="mb-1 text-white">Status</p>
                <select className="form-select">
                  <option>Status</option>
                  <option>Sold</option>
                  <option>Town House</option>
                  <option>Available</option>
                </select>
              </div>

              {/* Type */}
              <div className="col-12 col-md-3">
                <p className="mb-1 text-white">Type</p>
                <select className="form-select">
                  <option>Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Plot</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="col-12 col-md-3 d-flex gap-3 mt-3 mt-md-4 flex-wrap">
                <button className={`${styles.serch} flex-fill`}>Filter</button>
                <button className={`${styles.serch} flex-fill`}>Search</button>
              </div>

            </div>
          </div>
        </div>

        {/* ⭐ POPULAR SEARCHES */}
        <div className={`popular-search mt-4 ${styles.popular}`}>
          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
            <h6 className="text-light">Popular Search:</h6>
            <button className="btn btn-outline-light">Modern Villa</button>
            <button className="btn btn-outline-light">Studio Apartment</button>
            <button className="btn btn-outline-light">Town House</button>
            <button className="btn btn-light">More</button>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Hero;






