import React, { useState } from "react";
import axios from "axios";

import forimage from "../../assets/Imges/forimage.jpg";
import styles from "../../assets/Hero.module.css";

// ADD THIS
import secondcom from "../../assets/Pagethreecss/Second.module.css";

const Hero = () => {

  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  const [searchData, setSearchData] = useState({
    keyword: "",
    status: "",
    type: "",
  });

  const [properties, setProperties] = useState([]);

  // INPUT CHANGE
  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // SEARCH FUNCTION
  const handleSearch = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/property-search/",
        {
          params: {
            keyword: searchData.keyword,
            status: searchData.status,
            property_type: searchData.type,
          },
        }
      );

      setProperties(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className={`${styles.hero} position-relative`}>

        <div className="container" style={{marginBottom: "180px"}}>

          {/* HERO HEADING */}
          <div className="row text-center text-md-start pt-5">

            <div className="col-md-8 mx-auto">

              <h1 className={`${styles.herosec} text-light fw-bold`}>
                Explore. Buy. Sell. Rent. All in One Place.
              </h1>

              <p className="text-white-50 mt-2 fs-5">
                Find your dream property with ease —
                trusted listings, verified agents,
                and smart search tools.
              </p>

            </div>
          </div>

          {/* INPUT SECTION */}
          <div className={`${styles.inputese} mt-4`} style={{marginBottom:"150px"}}>

            <div className="p-4 rounded shadow-sm bg-white bg-opacity-25" >

              <div className="row g-3">

                {/* KEYWORD */}
                <div className="col-12 col-md-3 position-relative">

                  <p className="mb-1 text-white">
                    Keyword
                  </p>
                  <input
                    type="text"
                    name="keyword"
                    value={searchData.keyword}
                    onChange={handleChange}
                    className={`form-control ${styles.inputWithIcon}`}
                    placeholder="Enter Keyword"
                  />
                  <i className={`bi bi-search ${styles.inputIcon}`}></i>
                </div>

                {/* STATUS */}
                <div className="col-12 col-md-3">

                  <p className="mb-1 text-white">
                    Status
                  </p>

                  <select
                    name="status"
                    value={searchData.status}
                    onChange={handleChange}
                    className="form-select"
                  >

                    <option value="">
                      Select Status
                    </option>

                    <option value="available">
                      Available
                    </option>

                    <option value="sold">
                      Sold
                    </option>

                  </select>

                </div>

                {/* TYPE */}
                <div className="col-12 col-md-3">

                  <p className="mb-1 text-white">
                    Type
                  </p>

                  <select
                    name="type"
                    value={searchData.type}
                    onChange={handleChange}
                    className="form-select"
                  >

                    <option value="">
                      Select Type
                    </option>

                    <option value="villa">
                      Villa
                    </option>

                    <option value="apartment">
                      Apartment
                    </option>

                    <option value="house">
                      House
                    </option>

                    <option value="plot">
                      Plot
                    </option>

                  </select>

                </div>

                {/* BUTTON */}
                <div className="col-12 col-md-3 d-flex gap-3 mt-3 mt-md-4 flex-wrap">

                  <button
                    onClick={handleSearch}
                    className={`${styles.serch} flex-fill`}
                  >
                    Search
                  </button>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEARCH RESULTS */}
      <div className="container my-5">

        <div className="row g-4 mt-3">

          {properties.map((property) => {

            const imageUrl =
              `${DJANGO_BASE_URL}${property.image}`;

            return (

              <div
                className="col-md-4"
                key={property.id}
              >

                <div
                  className="card shadow-sm p-3"
                  style={{ borderRadius: "12px" }}
                >

                  {/* IMAGE */}
                  <div style={{ position: "relative" }}>

                    <img
                      src={imageUrl}
                      alt={property.title}
                      className="img-fluid rounded mb-3"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {/* TAGS */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        display: "flex",
                        gap: "6px",
                      }}
                    >

                      <div className={secondcom.buttonr}>
                        <button className="btn btn-sm text-white">

                          {property.listing_type === "rent"
                            ? "For Rent"
                            : "For Buy"}

                        </button>
                      </div>

                      {property.is_featured && (

                        <div className={secondcom.buttonf}>

                          <button className="btn btn-sm text-dark">
                            Featured
                          </button>

                        </div>
                      )}

                    </div>
                  </div>

                  {/* CONTENT */}
                  <h5 className="fw-bold">
                    {property.title}
                  </h5>

                  <h4 className="text-primary fw-bold">
                    ₹{property.price}
                  </h4>

                  <p className="text-muted">
                    {property.address}
                  </p>

                  <div className="d-flex justify-content-between text-center mt-3">

                    <div>
                      <i className="bi bi-house-door-fill"></i>

                      <p className="m-0">
                        {property.beds} Beds
                      </p>
                    </div>

                    <div>
                      <i className="bi bi-droplet-half"></i>

                      <p className="m-0">
                        {property.baths} Baths
                      </p>
                    </div>

                    <div>
                      <i className="bi bi-bounding-box-circles"></i>

                      <p className="m-0">
                        {property.sqft} Sqft
                      </p>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default Hero;