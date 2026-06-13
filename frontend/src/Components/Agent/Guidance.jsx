import React from 'react'
import guid from '../../assets/Guidance.module.css'

import kochi from '../../assets/Imges/team work.jpg';
const Guidance = () => {
  return (
    
      
<div className="container py-5">
  <div className={guid.propertysection}>

    <div className={guid.imageWrapper}>
      <img
        src={kochi}
        className={guid.propertyimg}
        alt="street"
      />
    </div>

    <div className={guid.propertytext}>

      <span className={guid.subHeading}>
        WHY CHOOSE US
      </span>

      <h2>
        Professional Guidance for Every Property Need
      </h2>

      <div className={guid.line}></div>

      <p>
        “This property offers a well-designed layout that ensures comfort,
        convenience, and effortless living. Every space is planned to enhance
        natural flow, making the home feel open and inviting. With strong
        structural detailing and modern finishes, it provides both style and
        practicality. From spacious rooms to thoughtful design elements, this
        property delivers a balanced and comfortable living experience for
        everyday life.”
      </p>

    </div>

  </div>
</div>
);

  
}

export default Guidance
