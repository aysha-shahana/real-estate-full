import React from 'react'

import said from '../../assets/Imges/saidimage.jpg'

import younee from '../../assets/Youneed.module.css';


const Yourneeds = () => {
  return (
   <div className={`container py-5 ${younee.section}`}>

  <div className={younee.topText}>
    <span className={younee.subTitle}>
      WHY CHOOSE US
    </span>

    <h2 className={younee.title}>
      Your needs, your vision—our expert support.
    </h2>
  </div>

  <div className="row align-items-center mt-5">

    <div className="col-lg-6">
      <div className={younee.contentBox}>

        <div className={younee.line}></div>

        <p className={younee.text}>
          We help you find a home that blends comfort and convenience.
          Our team provides expert guidance at every step, making your
          property decisions easier. We offer modern spaces designed to
          fit your lifestyle, ensuring a smooth and stress-free real
          estate experience from start to finish.
        </p>

      </div>
    </div>

    <div className="col-lg-6">
      <div className={younee.imageWrapper}>
        <img
          src={said}
          alt="img"
          className={younee.image}
        />
      </div>
    </div>

  </div>

</div>
  )}

export default Yourneeds;



  