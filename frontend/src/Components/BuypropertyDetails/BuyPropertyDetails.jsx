import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/propertydetails.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";

function BuyPropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [property, setProperty] = useState(null);

  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  const [phoneRevealed, setPhoneRevealed] = useState(false);
   
  const [showPhone, setShowPhone] = useState(false);

const [leadData, setLeadData] = useState({
  name: "",
  phone: "",
});

const handleLeadChange = (e) => {
  setLeadData({
    ...leadData,
    [e.target.name]: e.target.value,
  });
};

const handleRevealPhone = () => {
  if (!leadData.name.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!leadData.phone.trim()) {
    alert("Please enter your phone number");
    return;
  }

  setPhoneRevealed(true);
  setShowPhone(false);
};

  const fetchProperty = async () => {
    try {
      console.log("Loading property:", id);

      const res = await axios.get(
        `${DJANGO_BASE_URL}/api/property-details/${id}/`,
      );

      console.log(res.data);

      setProperty(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${DJANGO_BASE_URL}/api/buy-properties/`);

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isPlot = property?.property_type === "plot";
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    fetchProperty();
    fetchProperties();
  }, [id]);
  const [showModal, setShowModal] = useState(false);
  const [visitData, setVisitData] = useState({
    name: "",
    email: "",
    phone: "",
    visit_date: "",
    visit_time: "",
  });

  const handleVisitChange = (e) => {
    setVisitData({
      ...visitData,
      [e.target.name]: e.target.value,
    });
  };

const handleShowContact = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    navigate("/signin", {
      state: {
        redirectTo: `/buy-property/${id}`,
      },
    });

    return;
  }

  setShowPhone(true);
};

  const handleVisitSubmit = async () => {
    try {
      await axios.post(`${DJANGO_BASE_URL}/api/schedule-visit/`, {
        property: property.id,
        ...visitData,
      });

      alert("Visit Scheduled Successfully");

      setShowModal(false);
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

  const propertyAge = property?.year_built
    ? new Date().getFullYear() - property.year_built
    : null;

  const imageUrl = property.image
    ? `${DJANGO_BASE_URL}${property.image}`
    : "https://via.placeholder.com/900x600";

  return (
    <div
      className="container py-5"
      style={{ marginTop: "100px", minHeight: "100vh" }}
    >
      {/* TOP SECTION */}
      <div className="row g-4 align-items-start">
        {/* IMAGE */}
        <div className="col-lg-8">
          <img
            src={imageUrl}
            alt={property.title}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
            }}
          />

          <div
            className="card border-0 p-4 mt-4"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            <h4 className="fw-bold mb-3">Description</h4>
            <p
              className="text-muted"
              style={{
                lineHeight: "1.9",
                fontSize: "16px",
              }}
            >
              {property.description || "No description available"}
            </p>
          </div>

          {/* AMENITIES */}
          <div className="card border-0 shadow-sm p-4 mt-4">
            <h4 className="fw-bold mb-3">Amenities</h4>

            <div className="row g-3">
              {property.amenities?.length > 0 ? (
                property.amenities.map((amenity) => (
                  <div key={amenity.id} className="col-md-4">
                    <div className="border rounded p-3">✓ {amenity.name}</div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No amenities available</p>
              )}
            </div>
          </div>
        <div className="row mt-5 g-4">
        {/* LEFT */}
        <div className="col-lg-12">
          {/* DESCRIPTION */}

          {/* PROPERTY DETAILS */}
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Property Details</h4>

            <table className="table">
              <tbody>
               

                <tr>
                  <td>Property Type</td>
                  <td>{property.property_type}</td>
                </tr>
                {property.property_type !== "plot" && (
                  <>
                <tr>
                  <td>Bedrooms</td>
                  <td>{property.beds}</td>
                </tr>

                <tr>
                  <td>Bathrooms</td>
                  <td>{property.baths}</td>
                </tr>
                <tr>
                  <td>Furnishing</td>
                  <td>{property.furnishing?.replaceAll("_", " ")}</td>
                </tr>

              </>
)}

                 <tr>
                  <td>Area</td>
                  <td>{property.sqft} Sqft</td>
                </tr>

                <tr>
                  <td>Parking</td>
                  <td>{property.parking ? "Available" : "No"}</td>
                </tr>
{property.ownership && (
  <tr>
    <td>Ownership</td>
    <td>{property.ownership}</td>
  </tr>
)}

              {property.year_built && (
  <tr>
    <td>Year Built</td>
    <td>{property.year_built}</td>
  </tr>
)}



          {propertyAge && (
                <tr>
                  <td>Property Age</td>
                  <td>{propertyAge ? `${propertyAge} Years` : "-"}</td>
                </tr>

                )}

                <tr>
                  <td>Status</td>
                  <td>
                    <span className="badge bg-success">{property.status}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

         
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          {/* PROPERTY CARD */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h2 className="fw-bold">{property.title}</h2>

            <h1 className="text-primary fw-bold">
              ₹{Number(property.price).toLocaleString()}
            </h1>

            <p className="text-muted">📍 {property.address}</p>

            <hr />

            <div className="mb-3">
              <strong>Property Type:</strong> {property.property_type}
            </div>

            <div className="mb-3">
              <strong>Status:</strong> {property.status}
            </div>

           {!isPlot && property.beds > 0 && (
  <div className="mb-3">
    <strong>Bedrooms:</strong> {property.beds}
  </div>
)}

{!isPlot && property.baths > 0 && (
  <div className="mb-3">
    <strong>Bathrooms:</strong> {property.baths}
  </div>
)}

{!isPlot && property.furnishing && (
  <div className="mb-3">
    <strong>Furnishing:</strong>{" "}
    {property.furnishing.replaceAll("_", " ")}
  </div>
)}

{property.ownership && (
  <div className="mb-3">
    <strong>Ownership:</strong>{" "}
    {property.ownership.replaceAll("_", " ")}
  </div>
)}

{!isPlot && property.year_built && (
  <div className="mb-3">
    <strong>Year Built:</strong> {property.year_built}
  </div>
)}
            <hr />

{/* OWNER INFO */}
<div className="card border-0 shadow-sm p-3 mt-3">
  <div className="d-flex align-items-center gap-3">
    <img
      src={
        property.owner_image
          ? `${DJANGO_BASE_URL}${property.owner_image}`
          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
      alt="seller"
      style={{
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "50%",
      }}
    />

    <div>
      <span
        className="text-muted text-uppercase fw-bold"
        style={{
          fontSize: "11px",
          letterSpacing: "0.5px",
        }}
      >
        LISTED BY OWNER
      </span>

      <h6 className="fw-bold mb-0 mt-1">
        {property.owner_name || "Unknown Owner"}
      </h6>

      <small className="text-muted">
        Member since {property.member_since || "N/A"}
      </small>
    </div>
  </div>

  <hr />

  <div className="d-flex justify-content-between align-items-center">
    <span className="text-muted small">
      Total Properties
    </span>

    <span className="badge bg-dark rounded-pill">
      {property.total_properties || 0} Listed
    </span>
  </div>

  <div className="row g-2 mt-3">
    <div className="col-6">
      <button
        className="btn btn-success w-100"
        onClick={() => {
          if (property.phone) {
            window.open(
              `https://wa.me/91${property.phone}?text=Hi, I am interested in ${property.title}`,
              "_blank"
            );
          }
        }}
      >
        💬 WhatsApp
      </button>
    </div>

    <div className="col-6">
      {!phoneRevealed ? (
<button
  className="btn btn-dark w-100"
  onClick={handleShowContact}
>
  📞 Show Contact
</button>
      ) : (
        <button
          className="btn btn-dark w-100"
          onClick={() =>
            (window.location.href = `tel:${property.phone}`)
          }
        >
          📞 {property.phone}
        </button>
      )}
    </div>
  </div>

  <div className="border-top pt-3 mt-3">
    <small className="text-success">
      ● Usually responds within 30 minutes
    </small>
  </div>
</div>

            

            {/* SCHEDULE VISIT */}
            <button
              className="btn btn-primary w-100"
              onClick={() => setShowModal(true)}
            >
              📅 Schedule Visit
            </button>
          </div>
           {/* NEARBY PLACES */}
          <div className="card border-0 shadow-sm p-4 mt-4">
            <h4 className="fw-bold mb-3">Nearby Places</h4>

            {property.nearby_places ? (
              <ul className="list-unstyled mb-0">
                {property.nearby_places
                  .split(/\r?\n/)
                  .filter((place) => place.trim())
                  .map((place, index) => (
                    <li key={index} className="mb-2">
                      ✅ {place}
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-muted">No nearby places available</p>
            )}
          </div>
        </div>
        
      </div>

    
      
      <div className="mt-5">
        <h3 className="fw-bold mb-4">Related Properties</h3>
        <div className="row g-4">
          {properties
            .filter(
              (item) =>
                Number(item.id) !== Number(property.id) &&
                item.property_type === property.property_type &&
                item.listing_type === property.listing_type,
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
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="card-body">
                      <h5 className="fw-bold">{item.title}</h5>

                      <h6 className="text-primary fw-bold">
                        ₹{Number(item.price).toLocaleString()}
                      </h6>

                      <p className="text-muted small">{item.address}</p>

                      <div className="d-flex justify-content-between mt-3">
                        <span>🛏 {item.beds}</span>

                        <span>🛁 {item.baths}</span>

                        <span>📐 {item.sqft}</span>
                      </div>

                      <Link
                        to={`/buy-property/${item.id}`}
                        className="btn btn-outline-primary w-100 mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {showPhone && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Get Seller Contact Details</h4>

        <button
          onClick={() => setShowPhone(false)}
          className="btn p-0 border-0 bg-transparent"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <p className="text-muted mb-3">
        Fill your details to view the owner's phone number.
      </p>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={leadData.name}
        onChange={handleLeadChange}
      />

      <input
        type="tel"
        name="phone"
        placeholder="Your Phone Number"
        value={leadData.phone}
        onChange={handleLeadChange}
      />

      <button
        className={styles.continueBtn}
        onClick={handleRevealPhone}
      >
        Continue
      </button>
    </div>
  </div>
)}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Schedule Property Visit</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />

                <input
                  type="date"
                  name="visit_date"
                  className="form-control mb-3"
                  onChange={handleVisitChange}
                />

                <input
                  type="time"
                  name="visit_time"
                  className="form-control"
                  onChange={handleVisitChange}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleVisitSubmit}>
                  Confirm Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyPropertyDetails;
