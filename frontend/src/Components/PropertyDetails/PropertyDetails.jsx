import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from "../../assets/propertydetails.module.css";

function PropertyDetails() {
  const { id } = useParams();

  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visitData, setVisitData] = useState({
    name: "",
    email: "",
    phone: "",
    visit_date: "",
    visit_time: "",
  });

  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  const fetchProperty = async () => {
  try {
    const res = await axios.get(
      `${DJANGO_BASE_URL}/api/property-details-seller/${id}/`
    );

    console.log("PROPERTY RESPONSE:", res.data);

    setProperty(res.data);
  } catch (error) {
    console.log(error);
  }     
};


  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${DJANGO_BASE_URL}/api/rent-properties/`);
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    fetchProperty();
    fetchProperties();
  }, [id]);

  const handleVisitChange = (e) => {
    setVisitData({
      ...visitData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVisitSubmit = async () => {
    try {
      await axios.post(`${DJANGO_BASE_URL}/api/schedule-visit/`, {
        property: property.id,
        ...visitData,
      });

      alert("Visit Scheduled Successfully");
      setShowModal(false);
      // Reset form after successful submission
      setVisitData({ name: "", email: "", phone: "", visit_date: "", visit_time: "" });
    } catch (error) {
      console.log(error);
      alert("Failed to schedule visit");
    }
  };

  if (!property) {
    return (
      <div className="text-center py-5">
        <h3>Loading Property...</h3>
      </div>
    );
  }

  const phone = property.phone?.replace(/\D/g, "");

  const imageUrl = property.image
    ? `${DJANGO_BASE_URL}${property.image}`
    : "https://via.placeholder.com/900x600";

return (
  <div className="container py-5" style={{ marginTop: "100px", minHeight: "100vh" }}>
    
    {/* MAIN HERO SECTION */}
    <div className="row g-4 align-items-start">
      
      {/* LEFT COLUMN: IMAGE + DESCRIPTION */}
      <div className="col-lg-8">
        {/* IMAGE */}
        <img
          src={imageUrl}
          alt={property.title}
          className="img-fluid shadow"
          style={{
            width: "100%",
            height: "520px",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />

        <div className="card border-0 p-4 mt-4" style={{ borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,.08)" }}>
          <h4 className="fw-bold mb-3">Description</h4>
          <p className="text-muted" style={{ lineHeight: "1.9", fontSize: "16px" }}>
            {property.description || "No description available"}
          </p>
        </div>
      </div>

     {/* RIGHT COLUMN: PROFESSIONAL PROPERTY INFO */}
<div className="col-lg-4">
  <div
    className="card border-0 p-4 sticky-top"
    style={{
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,.05)",
      background: "#ffffff",
      top: "120px"
    }}
  >
    {/* TITLE & PRICE */}
    <div className="mb-3">
      <h3 className="fw-bold text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>
        {property.title}
      </h3>
      <p className="text-muted small d-flex align-items-center gap-1 mb-3">
        <span>📍</span> {property.address}
      </p>
      
      <div className="d-flex align-items-baseline gap-1">
        <span style={{ color: "#0066ff", fontSize: "36px", fontWeight: "800" }}>
          ₹{Number(property.price).toLocaleString()}
        </span>
        {property.listing_type === "rent" && (
  <span className="text-muted small">/ month</span>
)}
      </div>
    </div>

    <hr className="text-muted opacity-25 my-3" />

    {/* KEY DETAILS LIST */}
    <div className="d-flex flex-column gap-2.5 mb-4">
      <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light rounded-3">
        <span className="text-muted small fw-medium">Property Type</span>
        <span className="badge bg-white text-dark border fw-semibold shadow-sm px-2.5 py-1.5">{property.property_type}</span>
      </div>

      <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light rounded-3">
        <span className="text-muted small fw-medium">Status</span>
        <span className="badge bg-success-subtle text-success border border-success-subtle fw-semibold px-2.5 py-1.5">
          {property.status}
        </span>
      </div>

      <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light rounded-3">
        <span className="text-muted small fw-medium">Beds & Baths</span>
        <span className="fw-bold text-dark">{property.beds} BHK / {property.baths} Bath</span>
      </div>

      <div className="d-flex justify-content-between align-items-center py-2 px-3 bg-light rounded-3">
        <span className="text-muted small fw-medium">Total Area</span>
        <span className="fw-bold text-primary">{property.sqft} Sqft</span>
      </div>
    </div>

    {/* PROFESSIONAL SELLER CARD */}
  {/* PROFESSIONAL SELLER CARD (DYNAMIC) */}
<div 
  className="p-3 border rounded-3 mb-3 bg-white"
  style={{ borderColor: "#eaecf0" }}
>
  <div className="d-flex align-items-center gap-3 mb-3">
    <img
      src={
        property.owner_image
          ? `${DJANGO_BASE_URL}${property.owner_image}`
          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="seller"
      style={{ width: "48px", height: "48px", objectFit: "cover", borderRadius: "50%" }}
    />
    <div className="flex-grow-1">
      <span className="text-muted text-uppercase fw-bold" style={{ fontSize: "10px", letterSpacing: "0.5px" }}>
        {property.user_type ? `LISTED BY ${property.user_type}` : "LISTED BY OWNER"}
      </span>
      
      <h6 className="fw-bold text-dark m-0 mt-0.5">
        {property.owner_name || property.username || "Unknown Owner"}
      </h6>
      
      <span className="text-muted" style={{ fontSize: "11px" }}>
        Member since {property.member_since || "Sep 2014"}
      </span>
    </div>
  </div>

  {/* QUICK STATS - TOTAL PROPERTIES */}
  <div className="d-flex border-top pt-2 mt-2 justify-content-between align-items-center">
    <span className="text-muted small">Total Properties</span>
    <span className="badge bg-dark text-white rounded-pill px-2 py-1 small fw-bold">
      {property.total_properties || 0} Listed
    </span>
  </div>

  {/* DYNAMIC SELLER ACTIONS */}
  <div className="row g-2 mt-3">

  <div className="col-6">
<button
  className={styles.chatBtn}
  onClick={() => {
    if (property.phone) {
     window.open(
  `https://wa.me/${phone}?text=Hi, I am interested in ${property.title}`,
  "_blank"
);
    } else {
      alert("WhatsApp number not available");
    }
  }}
>
  💬 Chat on WhatsApp
</button>
  </div>

  <div className="col-6">
    <button
      className={styles.phoneBtn}
      onClick={() => {
        if (property.phone) {
          window.location.href = `tel:${property.phone}`;
        } else {
          alert("Phone number not provided by owner");
        }
      }}
    >
      📞{property.phone || "No Number"}
    </button>
  </div>

</div>
</div>

    {/* MAIN ACTION BUTTON */}
    <button 
      className="btn btn-primary w-100 py-2.5 fw-bold shadow-sm" 
      onClick={() => setShowModal(true)}
      style={{
        background: "linear-gradient(135deg, #0066ff 0%, #0052cc 100%)",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px"
      }}
    >
      📅 Schedule a Visit
    </button>
  </div>
</div>

    </div>

    {/* HIGHLIGHTS */}
    <div className="row mt-5 g-3">
      <div className="col-md-3">
        <div className="card text-center p-4 shadow-sm h-100">
          <h3>🛏</h3>
          <h5>{property.beds}</h5>
          <p className="mb-0">Bedrooms</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-4 shadow-sm h-100">
          <h3>🛁</h3>
          <h5>{property.baths}</h5>
          <p className="mb-0">Bathrooms</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-4 shadow-sm h-100">
          <h3>📐</h3>
          <h5>{property.sqft}</h5>
          <p className="mb-0">Sqft</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card text-center p-4 shadow-sm h-100">
          <h3>🏠</h3>
          <h5>{property.property_type}</h5>
          <p className="mb-0">Type</p>
        </div>
      </div>
    </div>

    {/* RELATED PROPERTIES */}
    <div className="mt-5" style={{ marginTop: "80px" }}>
      <h3 className="fw-bold mb-4">Related Properties</h3>
      <div className="row g-4">
        {properties
          .filter(
            (item) =>
              Number(item.id) !== Number(property.id) &&
              item.property_type === property.property_type &&
              item.listing_type === property.listing_type
          )
          .slice(0, 3)
          .map((item) => {
            const imageUrl = item.image
              ? `${DJANGO_BASE_URL}${item.image}`
              : "https://via.placeholder.com/400x300";

            return (
              <div className="col-md-4" key={item.id}>
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="fw-bold">{item.title}</h5>
                    <h6 className="text-primary fw-bold">₹{Number(item.price).toLocaleString()}</h6>
                    <p className="text-muted small">{item.address}</p>
                    <div className="d-flex justify-content-between mt-3">
                      <span>🛏 {item.beds}</span>
                      <span>🛁 {item.baths}</span>
                      <span>📐 {item.sqft}</span>
                    </div>
                    <Link to={`/property/${item.id}`} className="btn btn-outline-primary w-100 mt-3">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Schedule Property Visit</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  value={visitData.name}
                  placeholder="Your Name"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />
                <input
                  type="email"
                  name="email"
                  value={visitData.email}
                  placeholder="Email"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />
                <input
                  type="text"
                  name="phone"
                  value={visitData.phone}
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />
                <input
                  type="date"
                  name="visit_date"
                  value={visitData.visit_date}
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />
                <input
                  type="time"
                  name="visit_time"
                  value={visitData.visit_time}
                  className="form-control"
                  onChange={handleVisitChange}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleVisitSubmit}>Confirm Visit</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default PropertyDetails;