
import React from 'react'
import renti from '../../assets/Imges/rentbanner.jpg'
import sell from '../../assets/Mainhead.module.css'
   
const Rentals = () => {
  return (
    <section className={sell.rSection}>
      <div className="container">
        <div className="row align-items-center">

          {/* Left Column: Title + Search */}
          <div className="col-md-7">
            <h1 className={sell.htitle}>
              Find Rentals That Match Your Lifestyle
            </h1>

            <div className={`${sell.sBox} mt-4`}>
              <div className="row g-2 align-items-center">

                <div className="col-md-3">
                  <select className={`form-select ${sell.slect}`}>
                    <option value="">Select Category</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <select className={`form-select ${sell.slect}`}>
                    <option value="">Select Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="plot">Plot</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <select className={`form-select ${sell.slect}`}>
                    <option value="">Select Location</option>
                    <option value="wayanad">Wayanad</option>
                    <option value="kochi">Kochi</option>
                    <option value="palakkad">Palakkad</option>
                    <option value="kannur">Kannur</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <button className={`btn w-100 ${sell.archBtn}`}>
                    <i className="bi bi-search"></i> Search
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Animated Image */}
          <div className="col-md-5 text-center">
            <img
              src={renti}
              alt="Rental Illustration"
              className={sell.rightImage}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Rentals;

  
  
    
