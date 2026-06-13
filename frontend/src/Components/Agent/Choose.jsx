import React from "react";
import choose from "../../assets/choose.module.css";

const Choose = () => {
  return (
    <section className={choose.rSection}>
      <div className={choose.heroContent}>

        <h1 className={choose.htitle}>
          Choose the Perfect Agency for 
          <br />
          Your Property Needs
          
        </h1>

        <p className={choose.subText}>
          Find trusted real estate experts to help you discover,
          buy, or sell your dream property with confidence.
        </p>

      </div>
    </section>
  );
};

export default Choose;