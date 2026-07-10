import React, { useState } from "react";
import api from "../../assets/axiosConfig.js";
import styles from "../../assets/UserDashboard.module.css";
import { useNavigate } from "react-router-dom";

function QuickPropertyForm() {
  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

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

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "is_featured") {
      updatedValue = value === "true";
    }

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const amenitiesList = [
    "CCTV",
    "Garden",
    "Gym",
    "Lift",
    "Parking",
    "Security",
    "Swimming Pool",
    "Water Supply",
    "WiFi",
  ];

  const isPlot = formData.property_type === "plot";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "amenities") {
        data.append(key, formData[key]);
      }
    });

    formData.amenities.forEach((amenity) => {
      data.append("amenities", amenity);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await api.post("/add-property/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      alert("Property Added Successfully!");

      navigate("/my-properties");
    } catch (error) {
      console.log(error);
      alert("Failed to add property");
    }
  };

  return (
    <>
      <div className={styles.formCard}>
        <form
          className={styles.formCard}
          style={{ backgroundColor: "#f0f2f5" }}
          onSubmit={handleSubmit}
        >
          <h2>Quick Property Post</h2>

          <p>Please fill the below form. Our expert will contact you soon</p>

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

          {!isPlot && (
            <div className={styles.formGroup}>
              <label>Beds *</label>
              <input
                type="number"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
              />
            </div>
          )}

          {!isPlot && (
            <div className={styles.formGroup}>
              <label>Baths *</label>
              <input
                type="number"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
              />
            </div>
          )}

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

          {!isPlot && (
            <div className={styles.formGroup}>
              <label>Furnishing</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className={styles.formInput}
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
              value={formData.ownership}
              onChange={handleChange}
              className={styles.formInput}
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
                value={formData.year_built}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Nearby Places</label>

            <textarea
              name="nearby_places"
              value={formData.nearby_places}
              onChange={handleChange}
              rows="4"
              className={styles.formInput}
              placeholder={`Enter one nearby place per line
Example:
School - 500m
`}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Amenities</label>

            <div className={styles.amenitiesGrid}>
              {amenitiesList.map((item) => (
                <label key={item} className={styles.amenityItem}>
                  <input
                    type="checkbox"
                    value={item}
                    checked={formData.amenities.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          amenities: [...formData.amenities, item],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          amenities: formData.amenities.filter(
                            (a) => a !== item,
                          ),
                        });
                      }
                    }}
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>
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

          <div className={styles.actionButtons}>
            <button type="reset" className={styles.cancelBtn}>
              Cancel
            </button>

            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickPropertyForm;
