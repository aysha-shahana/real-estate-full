import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

function PropertyDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);

  const [property, setProperty] = useState(null);

  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

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

  const [showModal, setShowModal] =
  useState(false);

const [visitData, setVisitData] =
  useState({
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


const handleApplyRent = () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please login to apply for rental properties");
    navigate("/signin", {
      state: {
        redirectTo: `/apply-for-rent/${property.id}`,
      },
    });
    return;
  }

  navigate(`/apply-for-rent/${property.id}`);
};

const handleVisitSubmit = async () => {

  try {

    await axios.post(
      `${DJANGO_BASE_URL}/api/schedule-visit/`,
      {
        property: property.id,
        ...visitData,
      }
    );

    alert(
      "Visit Scheduled Successfully"
    );

    setShowModal(false);

  } catch (error) {

    console.log(error);

    alert(
      "Failed to schedule visit"
    );
  }
};



  if (!property) {
    return (
      <div className="text-center py-5">
        <h3>Loading Property...</h3>
      </div>
    );
  }

  const imageUrl = property.image
    ? `${DJANGO_BASE_URL}${property.image}`
    : "https://via.placeholder.com/900x600";

  return (
    <div className="container py-5" style={{ marginTop: "100px" }}>
      {/* TOP SECTION */}
      <div className="row g-4 align-items-start">
        {/* IMAGE */}
        <div className="col-lg-7">
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
        </div>

        {/* PROPERTY INFO */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold mb-3">{property.title}</h2>

            <h1 className="fw-bold text-primary mb-3">
              ₹{Number(property.price).toLocaleString()}
            </h1>

            <p className="text-muted mb-4">📍 {property.address}</p>

            <hr />

            <div className="mb-3">
              <strong>Property Type:</strong> {property.property_type}
            </div>

            <div className="mb-3">
              <strong>Status:</strong> {property.status}
            </div>

            <div className="mb-3">
              <strong>Bedrooms:</strong> {property.beds}
            </div>

            <div className="mb-3">
              <strong>Bathrooms:</strong> {property.baths}
            </div>

            <div className="mb-4">
              <strong>Area:</strong> {property.sqft} Sqft
            </div>

            <div className="d-flex gap-2">
<button
  className="btn btn-primary me-2"
  onClick={() => setShowModal(true)}
>
  Schedule Visit
</button>
        <button
  className="btn btn-success"
  onClick={handleApplyRent}
>
  Apply For Rent
</button>
            </div>
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

      {/* DESCRIPTION + CONTACT */}
      <div className="row mt-5 g-4">
        {/* LEFT */}
        <div className="col-lg-8">
          {/* DESCRIPTION */}
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h4 className="fw-bold mb-3">Description</h4>

            <p
              className="text-muted"
              style={{
                lineHeight: "1.9",
                fontSize: "16px",
              }}
            >
              {property.description ||
                "This apartment is thoughtfully crafted to provide a harmonious blend of comfort, elegance, and practical flow. Every space has been arranged with natural balance in mind, ensuring that each area feels open, inviting, and intuitively connected. The layout promotes smooth movement between rooms, enhancing both functionality and everyday living comfort. Clean lines, well-defined structure"}
            </p>
          </div>

          {/* PROPERTY DETAILS */}
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-3">Property Details</h4>

            <table className="table">
              <tbody>
                <tr>
                  <td>Property Type</td>
                  <td>{property.property_type}</td>
                </tr>

                <tr>
                  <td>Bedrooms</td>
                  <td>{property.beds}</td>
                </tr>

                <tr>
                  <td>Bathrooms</td>
                  <td>{property.baths}</td>
                </tr>

                <tr>
                  <td>Area</td>
                  <td>{property.sqft} Sqft</td>
                </tr>

                <tr>
                  <td>Status</td>
                  <td>
                    <span className="badge bg-success text-white">
                      {property.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>Listing Type</td>
                  <td>{property.listing_type}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div className="card border-0 shadow p-4">
            <h4 className="fw-bold mb-4">Contact Owner</h4>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Your Name"
            />

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Your Email"
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
            />

            <textarea
              className="form-control mb-3"
              rows="5"
              placeholder="Write your message..."
            />

            <button className="btn btn-primary w-100">Send Enquiry</button>
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
                        to={`/property/${item.id}`}
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
{showModal && (
  <div
    className="modal d-block"
    style={{
      background:
        "rgba(0,0,0,0.5)",
    }}
  >
    <div className="modal-dialog">

      <div className="modal-content">

        <div className="modal-header">

          <h5>
            Schedule Property Visit
          </h5>

          <button
            className="btn-close"
            onClick={() =>
              setShowModal(false)
            }
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
            onClick={() =>
              setShowModal(false)
            }
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleVisitSubmit}
          >
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

export default PropertyDetails;
