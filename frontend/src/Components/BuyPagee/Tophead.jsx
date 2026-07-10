import React, { useEffect, useState } from "react";
import bannerimg from "../../assets/Imges/buybannertwo.jpg";
import sell from "../../assets/Mainhead.module.css";
import api from "../../assets/axiosConfig";
import buying from "../../assets/buying.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Tophead = () => {
  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [searchData, setSearchData] = useState({
    property_type: "",
    budget: "",
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyProperties();
  }, []);

  const fetchBuyProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/buy-properties/`);
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

      const response = await api.get(
        `${DJANGO_BASE_URL}/api/buy-property-search/`,
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
    <div>
      <section className={sell.rSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className={sell.heroContent}>
              <h1 className={sell.htitle}>
                Buy The Home That Fits Your Life Perfectly
              </h1>

              <div className={`${sell.sBox} mt-4 p-3`}>
                <div className="row g-2 align-items-center">
                  <div className="col-md-4">
                    <select
                      name="property_type"
                      value={searchData.property_type}
                      onChange={handleChange}
                      className={`form-select ${sell.slect}`}
                    >
                      <option value="">Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                    </select>
                  </div>

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

                  <div className=" col-md-4 mt-2">
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

      <section id="buy-section" className="mt-4">
        <div className="container py-5">
          <div>
            <h2 className="mb-4 text-center fw-bold">
              Premium Communities for Confident Home Buying
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
                 const imageUrl = item.image || "https://via.placeholder.com/600x400";
                  return (
                    <div className="col-md-4" key={item.id}>
                      <div
                        className="card shadow-sm p-3"
                        style={{
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/buy-property/${item.id}`)}
                      >
                        {/* Image Wrap */}
                        <div style={{ position: "relative" }}>
                          <img
                            src={
                              item.image ? imageUrl : "https://via.placeholder.com/400x300"
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
                            <div className={buying.sebut}>
                              <Link
                                to="/singlepage"
                                className="btn btn-sm text-white"
                              >
                                For Buy
                              </Link>
                            </div>
                            {item.is_featured && (
                              <div className={buying.febut}>
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
                            <p className="m-0">{item.sqft || "N/A"} Sqft</p>
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
    </div>
  );
};

export default Tophead;
