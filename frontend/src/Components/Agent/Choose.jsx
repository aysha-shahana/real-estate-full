import React from 'react'
import choose from '../../assets/choose.module.css'
import agency from '../../assets/Imges/agency.jpg'



const Choose = () => {
  return (
    <div className="container">
    <div className={choose.section}>
      <div className={choose.sectionLeft}>
        <h1>
          Choose the Perfect Agency for Your <br />
          Property Needs
        </h1>
        <p>
          Find trusted real estate experts to help you discover, buy, or sell
          your dream property with confidence.
        </p>
      </div>

      <div className={choose.sectionRight}>
        <img src={agency} alt="Agency Banner" />
      </div>
    </div>
    </div>
  );
};



export default Choose;
