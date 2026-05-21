import React from 'react'

import said from '../../assets/Imges/saidimage.jpg'

import younee from '../../assets/Youneed.module.css';


const Yourneeds = () => {
  return (
   <div className={`container mt-5 py-5 ${younee.section}`}>

  <h2 className={younee.title}>
    Your needs, your vision—our expert support.
  </h2>

  <div className="row align-items-center mt-4">

    {/* Left Side Text */}
    <div className="col-md-6">
      <p className={younee.text}>
        We help you find a home that blends comfort and convenience.
        Our team provides expert guidance at every step, making your
        property decisions easier. We offer modern spaces designed to
        fit your lifestyle, ensuring a smooth and stress-free real
        estate experience from start to finish.
      </p>
    </div>

    {/* Right Side Image */}
    <div className="col-md-6 text-center">
      <img
        src={said}
        alt="img"
        className={`${younee.image} img-fluid rounded`}
      />
    </div>

  </div>
</div>

  )}

export default Yourneeds;



  