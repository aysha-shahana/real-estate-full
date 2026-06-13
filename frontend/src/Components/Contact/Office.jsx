import React from "react";
import ofimg from "../../assets/Imges/offi.jpg";
import oneoff from "../../assets/Imges/officeone.jpg";
import offf from "../../assets/Imges/offoo.jpg";
import style from "../../assets/office.module.css";
const offices = [
  {
    id: 1,
    name: "Smoky Hollow",
    address: "9514 Smoky Hollow St. Sulphur, LA 70663",
    phone: "(736) 267-8659",
    email: "rsmartin@gmail.com",
    image: ofimg,
  },
  {
    id: 2,
    name: "North Road",
    address: "19 North Road Piscataway, NJ 08854",
    phone: "(736) 267-8659",
    email: "rsmartin@gmail.com",
    image: oneoff,
  },
  {
    id: 3,
    name: "Rockville Ave",
    address: "8460 Rockville Ave. Greenville, NC 27834",
    phone: "(736) 267-8659",
    email: "rsmartin@gmail.com",
    image: offf,
  },
];

const Office = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f0f2f5" }}>
      <div className="container text-center">
        <h2 className="fw-bold mb-3">Visit Our Offices</h2>

        <p className="text-muted mb-5">
          Connect with our local property experts and receive personalized
          guidance for buying, selling, or renting your ideal property.
        </p>

        <div className="row g-4">
          {offices.map((office) => (
            <div className="col-lg-4 col-md-6" key={office.id}>
              <div className={style.officeCard}>
                <div className={style.imageWrapper}>
                  <img
                    src={office.image}
                    alt={office.name}
                    className={style.officeImage}
                  />
                </div>

                <div className={style.officeContent}>
                  <h4>{office.name}</h4>

                  <div className={style.infoItem}>
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>{office.address}</span>
                  </div>

                  <div className={style.infoItem}>
                    <i className="bi bi-telephone-fill"></i>
                    <span>{office.phone}</span>
                  </div>

                  <div className={style.infoItem}>
                    <i className="bi bi-envelope-fill"></i>
                    <span>{office.email}</span>
                  </div>

                  <button className={style.visitBtn}>Get Directions</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Office;
