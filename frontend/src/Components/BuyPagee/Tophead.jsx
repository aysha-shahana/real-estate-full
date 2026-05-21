import React from 'react'
import bannerimg from '../../assets/Imges/buybannertwo.jpg'
import sell from '../../assets/Mainhead.module.css'

const Tophead = () => {
  return (
    <div >
      <section className={sell.rSection}>
        <div className="container">

          <div className="row align-items-center">

          
            <div className="col-md-7">
              <h1 className={sell.htitle}>
                Buy the Home That Fits Your Life Perfectly
              </h1>

              <div className={`${sell.sBox} mt-4 p-3`}>
                <div className="row g-2 align-items-center">

                  <div className="col-6 col-md-3">
                   <select className={`form-select ${sell.slect}`}>
                      <option value="">Select Category</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Land</option>
                      <option>Others</option>
                    </select>
                  </div>

                  <div className="col-6 col-md-3">
                    <select className={`form-select ${sell.slect}`}>
                      <option>Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="office">Office</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="plot">Plot</option>
                    </select>
                  </div>

                  <div className="col-6 col-md-3">
                   <select className={`form-select ${sell.slect}`}>
                      <option>Location</option>
                      <option value="wayanad">Wayanad</option>
                      <option value="kochi">Kochi</option>
                      <option value="palakkad">Palakkad</option>
                      <option value="kannur">Kannur</option>
                    </select>
                  </div>

                  <div className="col-6 col-md-3">
                    <select className={`form-select ${sell.slect}`}>
                      <option>Budget</option>
                      <option>10,000-20,000</option>
                      <option>20,000-30,000</option>
                      <option>30,000-40,000</option>
                      <option>40,000-50,000</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-3 mt-2">
                    <button className={`btn w-100 ${sell.archBtn}`}>
                      <i className="bi bi-search"></i> Search
                    </button>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="col-md-5 text-center">
              <img
                src={bannerimg}
                alt="Right side illustration"
                className={`${sell.rightImage}`}
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};



export default Tophead;
