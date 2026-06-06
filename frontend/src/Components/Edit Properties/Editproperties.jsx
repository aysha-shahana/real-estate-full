import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    beds: "",
    baths: "",
    sqft: "",
    listing_type: "",
    property_type: "",
    status: "",
    is_featured: false,
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await axios.get(
        `${DJANGO_BASE_URL}/api/properties/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFormData(response.data);
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
      if (key !== "image") {
        data.append(key, formData[key]);
      }
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const token = localStorage.getItem("access_token");

      await axios.put(`${DJANGO_BASE_URL}/api/properties/${id}/edit/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Property Updated Successfully");

      navigate("/my-properties");
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);

      alert(JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>XEN</h2>
        </div>

        <div className={styles.profileSection}>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className={styles.profileImage}
          />
          <h3>{localStorage.getItem("username")}</h3>
          <p>Property Owner</p>
        </div> 
        <ul className={styles.menu}>
          <li onClick={() => navigate("/dashboard")}> <FaHome /> Dashboard</li>

          <li onClick={() => navigate("/my-properties")}> <FaBuilding /> My Properties</li>

          <li onClick={() => navigate("/add-property")}> <FaPlusCircle /> Add Property</li>
  
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
