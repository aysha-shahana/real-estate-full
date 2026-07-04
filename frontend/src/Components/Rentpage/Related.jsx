import React, { useEffect, useState } from "react";
import api from "../../assets/axiosConfig";
import { Link } from "react-router-dom";
import styles from "../../assets/Related.module.css";

const Related = () => {
  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentProperties = async () => {
    try {
const res = await api.get("/rent-properties/");
      // Latest 4 Properties
      const latest = [...res.data].sort((a, b) => b.id - a.id).slice(0, 4);

      setProperties(latest);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentProperties();
  }, []);

  if (loading) {
    return (
      <section className="container py-5">
        <h3 className="text-center">Loading Properties...</h3>
      </section>
    );
  }

  return (
    <section className={`container py-5 ${styles.section}`}>
      {/* Heading */}

      <div className={styles.topSection}>
        <div>
          <h2 className={styles.heading}>Recently Added Rental Properties</h2>

          <p className={styles.subHeading}>
            Discover the latest verified rental properties listed by owners and
            agents.
          </p>
        </div>

        <button
          className={styles.viewAll}
          onClick={() => {
            document.getElementById("rentals-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          View All Rentals →
        </button>
      </div>

      {/* Empty */}

      {properties.length === 0 ? (
        <div className={styles.empty}>
          <h5>No Rental Properties Available</h5>

          <p>New rental properties will appear here once added.</p>
        </div>
      ) : (
        <div className="row g-4">
          {properties.map((item) => {
            const imageUrl = item.image
              ? `${DJANGO_BASE_URL}${item.image}`
              : "https://via.placeholder.com/600x400";

            return (
              <div className="col-lg-3 col-md-6" key={item.id}>
                <div className={styles.card}>
                  {/* IMAGE */}

                  <div className={styles.imageWrapper}>
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className={styles.image}
                    />

                    <span className={styles.badge}>✔ Verified</span>
                  </div>

                  {/* BODY */}

                  <div className={styles.body}>
                    <span className={styles.propertyType}>
                      {item.property_type}
                    </span>

                    <h5 className={styles.title}>{item.title}</h5>

                    <h4 className={styles.price}>
                      ₹{Number(item.price).toLocaleString("en-IN")}
                      <span>/month</span>
                    </h4>

                    <p className={styles.location}>📍 {item.address}</p>

                    <div className={styles.details}>
                      {item.property_type !== "plot" && (
                        <>
                          <span>🛏 {item.beds}</span>

                          <span>🛁 {item.baths}</span>
                        </>
                      )}

                      <span>📐 {item.sqft} sqft</span>
                    </div>

                    <div className={styles.footer}>
                      <span className={styles.owner}>
                        {item.user_type
                          ? `Listed by ${item.user_type}`
                          : "Listed by Owner"}
                      </span>

                      <Link
                        to={`/property/${item.id}`}
                        className={styles.detailsBtn}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Related;
