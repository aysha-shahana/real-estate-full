import React from 'react'
import steps from '../../assets/Steps.module.css';
const Steps = () => {
  return (
 <div className={steps.stepsSection}>
  <div className={steps.overlay}>

    <div className="container">

      <div className={steps.headingArea}>
        <h2>
          Find Your Perfect Place
          <br />
          In 3 Easy Steps
        </h2>
      </div>

      <div className="row g-4 justify-content-center">

        <div className="col-md-4">
          <div className={steps.stepCard}>

            <div className={steps.iconCircle}>
              <i className="bi bi-house-door-fill"></i>
            </div>

            <h5>Find Real Estate</h5>

            <p>
              Discover modern homes, luxury apartments and plots
              that match your lifestyle.
            </p>

            <a href="#">Read More →</a>

          </div>
        </div>

        <div className="col-md-4">
          <div className={steps.stepCard}>

            <div className={steps.iconCircle}>
              <i className="bi bi-people"></i>
            </div>

            <h5>Expert Guidance</h5>

            <p>
              Experienced agents helping you discover premium
              properties and achieve the best deals.
            </p>

            <a href="#">Read More →</a>

          </div>
        </div>

        <div className="col-md-4">
          <div className={steps.stepCard}>

            <div className={steps.iconCircle}>
              <i className="bi bi-house-lock"></i>
            </div>

            <h5>Secure Your Home</h5>

            <p>
              We guide you through every stage — search,
              select and secure your new home.
            </p>

            <a href="#">Read More →</a>

          </div>
        </div>

      </div>

    </div>

  </div>
</div>
  )}

export default Steps;


