import React, { useEffect, useState } from "react";
import api from "../../assets/axiosConfig.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../assets/UserDashboard.module.css";
import {
  FaHome,
  FaBuilding,
  FaPlusCircle,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Editproperties = () => {
  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    beds: "",
    baths: "",
    sqft: "",
    description: "",
    listing_type: "",
    property_type: "",
    status: "",
    furnishing: "",
    ownership: "",
    year_built: "",
    nearby_places: "",
    amenities: [],
    is_featured: false,
  });

  const isPlot = formData.property_type === "plot";

  useEffect(() => {
    fetchProperty();
    fetchUser();
  }, []);

  const amenitiesList = [
    { id: 1, name: "CCTV" },
    { id: 2, name: "Garden" },
    { id: 3, name: "Gym" },
    { id: 4, name: "Lift" },
    { id: 5, name: "Parking" },
    { id: 6, name: "Security" },
    { id: 7, name: "Swimming Pool" },
    { id: 8, name: "Water Supply" },
    { id: 9, name: "WiFi" },
  ];

  const fetchUser = async () => {
    try {
      const response = await api.get("/current-user/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperty = async () => {
    try {
      const response = await api.get(
        `${DJANGO_BASE_URL}/api/properties/${id}/`,
      );

      setFormData({
        ...response.data,
        amenities: response.data.amenities?.map((item) => item.id) || [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "is_featured" ? value === "true" : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "amenities") {
        data.append(key, formData[key] ?? "");
      }
    });

    formData.amenities.forEach((id) => {
      data.append("amenities", id);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await api.put(`${DJANGO_BASE_URL}/api/properties/${id}/edit/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property Updated Successfully");
      navigate("/my-properties");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/xen-logo.png" alt="logo" />
          </Link>
        </div>

        <div className={styles.profileSection}>
          <img
            src={
              userData?.profile_image
                ? userData.profile_image
                : "/default-avatar.png"
            }
            alt="profile"
            className={styles.profileImage}
          />
          <h3>{localStorage.getItem("username")}</h3>
          <p>Property Owner</p>
        </div>
        <ul className={styles.menu}>
          <li onClick={() => navigate("/dashboard")}>
            {" "}
            <FaHome /> Dashboard
          </li>

          <li onClick={() => navigate("/my-properties")}>
            {" "}
            <FaBuilding /> My Properties
          </li>

          <li onClick={() => navigate("/add-property")}>
            {" "}
            <FaPlusCircle /> Add Property
          </li>

          <li onClick={() => navigate("/visit-requests")}>
            <FaBuilding />
            Visit Requests
          </li>

          <li onClick={() => navigate("/contact-leads")}>
            <FaUser />
            Contact Leads
          </li>

          <li className={styles.active}>Edit Property</li>

          <li onClick={() => navigate("/profile")}>
            <FaUser />
            Profile
          </li>
        </ul>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div>
            <h2>Edit Property</h2>
            <p>Update your property information</p>
          </div>
        </div>

        <div className={styles.editPropertyCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Baths</label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              {!isPlot && (
                <div className={styles.formGroup}>
                  <label>Furnishing</label>

                  <select
                    name="furnishing"
                    value={formData.furnishing || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Furnishing</option>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="fully_furnished">Fully Furnished</option>
                  </select>
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Ownership</label>

                <select
                  name="ownership"
                  value={formData.ownership || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Ownership</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>

              {!isPlot && (
                <div className={styles.formGroup}>
                  <label>Year Built</label>

                  <input
                    type="number"
                    name="year_built"
                    value={formData.year_built || ""}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Nearby Places</label>

                <textarea
                  name="nearby_places"
                  value={formData.nearby_places || ""}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Sqft</label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Amenities</label>

                <div className={styles.amenitiesGrid}>
                  {amenitiesList.map((item) => (
                    <label
                      key={item.id}
                      className={`${styles.amenityItem} ${
                        formData.amenities.includes(item.id)
                          ? styles.amenityChecked
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              amenities: [...formData.amenities, item.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              amenities: formData.amenities.filter(
                                (a) => a !== item.id,
                              ),
                            });
                          }
                        }}
                      />

                      <span>{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.image && (
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Current Property Image</label>

                  <div className={styles.imageWrapper}>
                    <img
                      src={`${DJANGO_BASE_URL}${formData.image}`}
                      alt="property"
                      className={styles.currentImage}
                    />
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label>New Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate("/my-properties")}
              >
                Cancel
              </button>

              <button type="submit" className={styles.submitBtn}>
                Update Property
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Editproperties;
