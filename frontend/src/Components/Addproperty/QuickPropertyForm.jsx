import React, { useState } from "react";
import api from "../../assets/axiosConfig.js";
import styles from "../../assets/UserDashboard.module.css";
import { useNavigate } from "react-router-dom";

function QuickPropertyForm() {
  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  // FORM STATE
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
    is_featured: false,
  });

  const navigate = useNavigate();

  // IMAGE STATE
  const [image, setImage] = useState(null);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // convert boolean string to real boolean
    if (name === "is_featured") {
      updatedValue = value === "true";
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  // HANDLE IMAGE
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const token = localStorage.getItem("access_token");

      await api.post("/add-property/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      alert("Property Added Successfully!");

      navigate("/my-properties");

      setFormData({
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
        is_featured: false,
      });

      setImage(null);
    } catch (error) {
      console.log(error);

      alert("Failed to add property");
    }
  };

  return (
    <>
      {/* FORM */}
      <div className={styles.formCard}>
        <form
          className={styles.formCard}
          style={{ backgroundColor: "#f0f2f5" }}
          onSubmit={handleSubmit}
        >
          <h2>Quick Property Post</h2>

          <p>Please fill the below form. Our expert will contact you soon</p>

          {/* PROPERTY TITLE */}
          <div className={styles.formGroup}>
            <label>Property Title *</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* PRICE */}
          <div className={styles.formGroup}>
            <label>Price *</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* ADDRESS */}
          <div className={styles.formGroup}>
            <label>Address *</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* BEDS */}
          <div className={styles.formGroup}>
            <label>Beds *</label>

            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              required
            />
          </div>

          {/* BATHS */}
          <div className={styles.formGroup}>
            <label>Baths *</label>

            <input
              type="number"
              name="baths"
              value={formData.baths}
              onChange={handleChange}
              required
            />
          </div>

          {/* SQFT */}
          <div className={styles.formGroup}>
            <label>Sqft *</label>

            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={styles.formInput}
                placeholder="Enter property description"
              />
          </div>


          <div className={styles.formGroup}>
            <label>Listing Type *</label>

            <select
              name="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">Select Type</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* PROPERTY TYPE */}
          <div className={styles.formGroup}>
            <label>Property Type *</label>

            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">Select Property Type</option>

              <option value="villa">Villa</option>

              <option value="apartment">Apartment</option>

              <option value="house">House</option>

              <option value="plot">Plot</option>
            </select>
          </div>

          {/* STATUS */}
          <div className={styles.formGroup}>
            <label>Status *</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.formInput}
              required
            >
              <option value="">Select Status</option>

              <option value="available">Available</option>

              <option value="sold">Sold</option>

              <option value="pending">Pending</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Featured Property</label>

            <select
              name="is_featured"
              value={formData.is_featured}
              onChange={handleChange}
              className={styles.formInput}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className={styles.formGroup}>
            <label>Property Image *</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.formInput}
              required
            />
          </div>

          {/* BUTTONS */}
          <div className={styles.actionButtons}>
            <button type="reset" className={styles.cancelBtn}>
              {" "}
              Cancel
            </button>

            <button type="submit" className={styles.submitBtn}>
              {" "}
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickPropertyForm;
