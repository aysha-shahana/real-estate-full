import React, { useState } from "react";
import axios from "axios";
import quicksell from "../../assets/QuickpropertyForm.module.css";
import sell from "../../assets/Mainhead.module.css";
import sellimg from "../../assets/Imges/sellbannertwo.jpg";

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
    listing_type: "",
    is_featured: false,
  });

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
      const response = await axios.post(
        `${DJANGO_BASE_URL}/api/add-property/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

      alert("Property Added Successfully!");

      // RESET FORM
      setFormData({
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

      setImage(null);
    } catch (error) {
      console.error(error.response?.data || error);

      alert("Failed to add property");
    }
  };

  return (
    <>
      <section className={sell.rSection}>
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT SIDE */}
            <div className="col-md-7">
              <h1 className={sell.htitle}>
                Trusted Solutions for Selling Your Property
              </h1>

              <div className={`${quicksell.sellBox} mt-4 p-3`}>
                <div className="row g-2 align-items-center">
                  <div className="col-md-3">
                    <a href="#sellform">
                      <button className={quicksell["sell-rent"]}>
                        Sell or Rent Your Property
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-md-5 text-center">
              <img
                src={sellimg}
                alt="illustration"
                className={sell.rightImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <div className={quicksell.container} id="sellform">
        <form
          className={quicksell["form-card"]}
          style={{ backgroundColor: "#f0f2f5" }}
          onSubmit={handleSubmit}
        >
          <h2>Quick Property Post</h2>

          <p>Please fill the below form. Our expert will contact you soon</p>

          {/* PROPERTY TITLE */}
          <div className={quicksell["form-group"]}>
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
          <div className={quicksell["form-group"]}>
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
          <div className={quicksell["form-group"]}>
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
          <div className={quicksell["form-group"]}>
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
          <div className={quicksell["form-group"]}>
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
          <div className={quicksell["form-group"]}>
            <label>Sqft *</label>

            <input
              type="number"
              name="sqft"
              value={formData.sqft}
              onChange={handleChange}
              required
            />
          </div>
          <div className={quicksell["form-group"]}>
            <label>Listing Type *</label>

            <select
              name="listing_type"
              value={formData.listing_type}
              onChange={handleChange}
              className={quicksell.input}
              required
            >
              <option value="">Select Type</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* PROPERTY TYPE */}
          <div className={quicksell["form-group"]}>
            <label>Property Type *</label>

            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className={quicksell.input}
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
          <div className={quicksell["form-group"]}>
            <label>Status *</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={quicksell.input}
              required
            >
              <option value="">Select Status</option>

              <option value="available">Available</option>

              <option value="sold">Sold</option>

              <option value="pending">Pending</option>
            </select>
          </div>

          <div className={quicksell["form-group"]}>
            <label>Featured Property</label>

            <select
              name="is_featured"
              value={formData.is_featured}
              onChange={handleChange}
              className={quicksell.input}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className={quicksell["form-group"]}>
            <label>Property Image *</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={quicksell.input}
              required
            />
          </div>

          {/* BUTTONS */}
          <div className={quicksell["action-buttons"]}>
            <button type="reset" className={quicksell["cancel-btn"]}>
              Cancel
            </button>

            <button type="submit" className={quicksell["submit-btn"]}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default QuickPropertyForm;
