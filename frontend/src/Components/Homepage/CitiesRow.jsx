import React from "react";
import one from "../../assets/Imges/keralaone.jpg";
import two from "../../assets/Imges/keralathree.jpg";
import three from "../../assets/Imges/keralafor.jpg";
import styles from "../../assets/CitiesRow.module.css";

const cities = [
  { name: "Wayanad", img: one, properties: 5 },
  { name: "Kannur", img: two, properties: 3 },
  { name: "Kozhikode", img: three, properties: 4 },
  { name: "Kochi", img: one, properties: 1 },
  { name: "Trivandrum", img: two, properties: 2 },
  { name: "Alappuzha", img: three, properties: 5},
];

function CitiesRow() {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Find Properties in These Cities</h2>
        <p className="text-muted">
          Explore the best properties available across Kerala.
        </p>
      </div>

      <div className="row g-4">
        {cities.map((city, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className={styles.cityCard}>
              <img src={city.img} alt={city.name} />

              <div className={styles.overlay}>
                <h5>{city.name}</h5>
                <span>{city.properties} Properties</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitiesRow;