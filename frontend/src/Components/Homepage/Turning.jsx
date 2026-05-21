import React from "react";
import family from "../../assets/Imges/apartment.jpg";
import whiteimg from "../../assets/Imges/Realhome.jpg";

import turning from "../../assets/Turning.module.css";

const Turning = () => {
  return (
    <section className="turning-section container mt-3 py-5">
      <div className="row align-items-center">

        {/* LEFT IMAGES */}
        <div className="col-md-6 d-flex gap-3">

          {/* LEFT SMALL IMAGE + STAT CARD */}
          <div className={turning.leftImages}>
            <img
              src={family}
              alt="family"
              className={turning.imgSmall}
            />

            <div className={turning.statsCard}>
              <p className={turning.iconBox}>
                <i className="bi bi-house-door-fill"></i>
              </p>
              <h5>Properties For Sale</h5>
              <p>14K</p>
            </div>
          </div>

          {/* RIGHT LARGE IMAGE */}
          <img
            src={whiteimg}
            alt="house"
            className={turning.imgLarge}
          />
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="col-md-6">
          <h2 className={turning.title}>Turning Property Dreams into Reality</h2>

          <p className={turning.subtitle}>
            Discover exclusive listings and trusted agents who make buying,
            selling, or renting effortless.
          </p>

          <ul className="list-unstyled">
            <li className={turning.featureItem}>
              <i className="bi bi-check-circle-fill"></i> 100% Secure
            </li>
            <li className={turning.featureItem}>
              <i className="bi bi-check-circle-fill"></i> Wide Range of Properties
            </li>
            <li className={turning.featureItem}>
              <i className="bi bi-check-circle-fill"></i> Buy or Rent Homes
            </li>
            <li className={turning.featureItem}>
              <i className="bi bi-check-circle-fill"></i> Trusted by Thousands
            </li>
          </ul>

          <button className="btn btn-dark mt-3">Learn More</button>
        </div>

      </div>
    </section>
  );
};

export default Turning;
