import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "../../assets/FeaturedProperties.module.css";

const FeaturedProperties = () => {

  const DJANGO_BASE_URL = "http://127.0.0.1:8000";

  const [properties, setProperties] = useState([]);

  // FETCH FEATURED PROPERTIES
  useEffect(() => {

    fetchFeaturedProperties();

  }, []);

  const fetchFeaturedProperties = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/featured-properties/"
      );

      setProperties(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="container mt-3 py-5">

      <div className={styles.feature}>

        <h2 className={styles.head}>
          Featured Properties
        </h2>

        <p>
          Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>

        <div className="row g-4">

          {properties.map((property) => {

            const imageUrl =
              `${DJANGO_BASE_URL}${property.image}`;

            return (

              <div
                className="col-12 col-sm-6 col-md-4"
                key={property.id}
              >

                <div className={`${styles.cardBox} animateCard`}>

                  {/* IMAGE */}
                  <div className={styles.imageContainer}>

                    <img
                      src={imageUrl}
                      alt={property.title}
                      className={styles.cardImage}
                    />

                    {/* TAG BUTTONS */}
                    <div className={styles.tagButtons}>

                      <button className={styles.buyBtn}>

                        {property.listing_type === "rent"
                          ? "For Rent"
                          : "For Buy"}

                      </button>

                      {property.is_featured && (

                        <button className={styles.featureBtn}>
                          Featured
                        </button>

                      )}

                    </div>
                  </div>

                  {/* CARD BODY */}
                  <div className={styles.cardBody}>

                    <h4 className={styles.cardTitle}>
                      {property.property_type}
                    </h4>

                    <p className={styles.price}>
                      ₹{property.price}
                    </p>

                    <p className={styles.location}>
                      {property.address}
                    </p>

                    <p className={styles.details}>

                      {property.beds && (
                        <>
                          <i className="bi bi-house-door-fill"></i>

                          {" "}
                          {property.beds} Beds
                          &nbsp; | &nbsp;
                        </>
                      )}

                      {property.baths && (
                        <>
                          <i className="bi bi-droplet-half"></i>

                          {" "}
                          {property.baths} Baths
                          &nbsp; | &nbsp;
                        </>
                      )}

                      <i className="bi bi-bounding-box-circles"></i>

                      {" "}
                      {property.sqft} Sqft

                    </p>

                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default FeaturedProperties;