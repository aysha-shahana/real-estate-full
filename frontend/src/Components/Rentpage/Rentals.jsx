import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import renti from "../../assets/Imges/rentbanner.jpg";
import sell from "../../assets/Mainhead.module.css";
import secondcom from "../../assets/Pagethreecss/Second.module.css";

<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap" rel="stylesheet"></link>

const Rentals = () => {
  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  // SEARCH BAR FORM STATE
  const [searchData, setSearchData] = useState({
    property_type: "",
    budget: "",
  });

  const navigate = useNavigate();

  // SHARED STATE FOR RENTAL CARDS
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH ALL RENT PROPERTIES ON INITIAL MOUNT
  useEffect(() => {
    fetchRentProperties();
  }, []);

  const fetchRentProperties = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${DJANGO_BASE_URL}/api/rent-properties/`,
      );
      setProperties(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching listings:", err);
      setError("Failed to load listings. Check Django console.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE DROPDOWN AND INPUT CHANGES
  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // RUN SEARCH ON BACKEND WITH FILTER PARAMS
  const handleSearch = async () => {
    try {
      setLoading(true);
      const params = {};

      if (searchData.property_type) {
        params.property_type = searchData.property_type;
      }
      if (searchData.budget) {
        params.budget = searchData.budget;
      }

      const response = await axios.get(
        `${DJANGO_BASE_URL}/api/rent-property-search/`,
        { params },
      );

      setProperties(response.data);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= HERO & SEARCH SECTION ================= */}
      <section className={sell.rSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT SIDE SEARCH CONTROL */}
            <div className={sell.heroContent}>
              <h1 className={sell.htitle}>
                Find Rentals That Match Your Lifestyle
              </h1>

              <div className={sell.sBox}>
                <div className="row g-3">
                  {/* PROPERTY TYPE DROPDOWN */}
                  <div className="col-md-4">
                    <select
                      name="property_type"
                      value={searchData.property_type}
                      onChange={handleChange}
                      className={`form-select ${sell.slect}`}
                    >
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                    </select>
                  </div>

                  {/* BUDGET DROPDOWN */}
                  <div className="col-md-4">
                    <select
                      name="budget"
                      value={searchData.budget}
                      onChange={handleChange}
                      className={`form-select ${sell.slect}`}
                    >
                      <option value="">Budget</option>
                      <option value="50000-100000">50,000 - 1,00,000</option>
                      <option value="100000-300000">1,00,000 - 3,00,000</option>
                      <option value="300000-900000">3,00,000 - 9,00,000</option>
                      <option value="1000000">Above 10 lakh</option>
                    </select>
                  </div>

                  {/* SEARCH SUBMIT BUTTON */}
                  <div className="col-md-4">
                    <button
                      onClick={handleSearch}
                      className={`btn w-100 ${sell.archBtn}`}
                    >
                      <i className="bi bi-search"></i> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DYNAMIC CARDS SECTION (YOUR SECONDCOM DATA) ================= */}
      <section className="mt-4">
        <div className="container py-5">
          <div className={secondcom.headoo}>
            <h2 className="mb-4 text-center fw-bold">
              Trusted Expertise for a Smooth Rental Journey
            </h2>
          </div>

          {/* ASYNC STATE HANDLERS */}
          {loading ? (
            <div className="text-center my-5">
              <h4>Loading properties...</h4>
            </div>
          ) : error ? (
            <div className="text-center my-5 text-danger">
              <h4>{error}</h4>
            </div>
          ) : (
            <div className="row g-4 mt-3">
              {properties.length > 0 ? (
                properties.map((item) => {
                  const imageUrl = item.image?.startsWith("http")
                    ? item.image
                    : `${DJANGO_BASE_URL}${item.image}`;
                  return (
                    <div className="col-md-4" key={item.id}>
                      <div
                        className="card shadow-sm p-3"
                        style={{
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/property/${item.id}`)}
                      >
                        {/* Image Wrap */}
                        <div style={{ position: "relative" }}>
                          <img
                            src={
                              item.image
                                ? imageUrl
                                : "https://via.placeholder.com/400x300"
                            }
                            alt={item.head || item.title}
                            className="img-fluid rounded mb-3"
                            style={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />

                          {/* Top Status Tags */}
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
                                For Rent
                              </button>
                            </div>
                            {item.is_featured && (
                              <div className={secondcom.buttonf}>
                                <button className="btn btn-sm text-dark">
                                  Featured
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Title & Pricing Data */}
                        <h5 className="fw-bold">{item.head || item.title}</h5>
                        <h4 className="text-primary fw-bold">
                          ₹{Number(item.price).toLocaleString()}
                        </h4>

                        <p className="text-muted">
                          {item.location || item.address}
                        </p>

                        {/* Property Utility Metrics */}
                        <div className="d-flex justify-content-between text-center mt-3">
                          <div>
                            <i className="bi bi-house-door-fill"></i>
                            <p className="m-0">{item.beds} Beds</p>
                          </div>

                          <div>
                            <i className="bi bi-droplet-half"></i>
                            <p className="m-0">{item.baths} Baths</p>
                          </div>

                          <div>
                            <i className="bi bi-bounding-box-circles"></i>
                            <p className="m-0">
                              {item.sqft ? `${item.sqft} Sqft` : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-5 w-100">
                  <h5 className="text-muted">
                    No properties found matching your search.
                  </h5>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Rentals;
