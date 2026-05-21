import React from 'react'
import steps from '../../assets/Steps.module.css';
const Steps = () => {
  return (
  <div className={`container mt-3 py-5 ${steps['citycard']}`}>

  <div className={steps.maincan}>
    <div className="container py-5 mt-3">
      
      <div className="text-center mb-4">
        <h3 className="fw-bold">Find Your Perfect Place in 3 Easy Steps</h3>
        <p className="text-muted">
          Your trusted real estate partner for buying, selling and renting across Kerala.
        </p>
      </div>

      <div className="row g-4 text-center mt-3">

       
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className={steps.iconCircle}>
            <i className="bi bi-house-door-fill"></i>
          </div>

          <div>
            <h5>Find Real Estate</h5>
            <p>Discover modern homes, luxury apartments and plots that match your lifestyle.</p>
          </div>
        </div>

       
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className={steps.iconCircle}>
            <i className="bi bi-people"></i>
          </div>

          <div>
            <h5>Your Expert Real Estate Guides</h5>
            <p>Experienced agents helping you discover premium properties and achieve the best deals.</p>
          </div>
        </div>

      
        <div className="col-12 col-md-4 d-flex flex-column align-items-center">
          <div className={steps.iconCircle}>
            <i className="bi bi-house-lock"></i>
          </div>

          <div>
            <h5>Your New Beginning Starts Here</h5>
            <p>We guide you through every stage — search, select and secure your new home effortlessly.</p>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>
  )}

export default Steps;


