import React from 'react'

import sstatoo from '../../assets/Lastpage.module.css'

import homecard from "../../assets/Imges/homeimagecard.jpg";
import sideimage from "../../assets/Imges/home.jpg";
import sideimag from "../../assets/Imges/Apartment.jpg";


const cardsdata = [
  {
    id: 1,
    image: homecard,
    head: "Luxury Family Home",
    price: "450000",
    location: "245/12 MG Road Kochi Ernakulam Kerala 682016",
    beds: 3,
    baths: 2,
    sqft: 1500,
  },
  {
    id: 2,
    image: homecard,
    head: "Luxury Family Home",
    price: "450000",
    location: "245/12 MG Road Kochi Ernakulam Kerala 682016",
    beds: 3,
    baths: 2,
    sqft: 1500,
  },
  {
    id: 3,
    image: homecard,
    head: "Luxury Family Home",
    price: "450000",
    location: "245/12 MG Road Kochi Ernakulam Kerala 682016",
    beds: 3,
    baths: 2,
    sqft: 1500,
  },
  {
    id: 4,
    image: homecard,
    head: "Luxury Family Home",
    price: "450000",
    location: "245/12 MG Road Kochi Ernakulam Kerala 682016",
    beds: 3,
    baths: 2,
    sqft: 1500,
  },
];

const Lastpage= () => {
  return (
    <div className="container py-5">

      <h3 className={`mb-4 text-center ${sstatoo.heading}`}>
        Related Properties
      </h3>

      <div className="row g-4">

        {/* LEFT CARDS */}
        <div className="col-lg-7">
          <div className="row g-4">
            {cardsdata.map((item) => (
              <div className="col-12 col-md-6" key={item.id}>
                <div className={`card shadow-sm rounded-4 ${sstatoo.card}`}>

                  <div className={sstatoo.imageWrapper}>
                    <img
                      src={item.image}
                      className="card-img-top rounded-top-4"
                      alt={item.head}
                    />
                  </div>

                  <div className="card-body">
                    <h6 className={sstatoo.title}>{item.head}</h6>
                    <h5 className={sstatoo.price}>₹{item.price}</h5>
                    <p className="small text-muted">{item.location}</p>

                    <div className="d-flex justify-content-between small">
                      <span>🛏 {item.beds} Beds</span>
                      <span>🛁 {item.baths} Baths</span>
                      <span>📐 {item.sqft} sqft</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-5">
          <img src={sideimage} className={`img-fluid rounded-4 mb-3 ${sstatoo.bigImg}`} />

          <div className="row g-3 mb-3">
            {[1, 2, 3].map((a) => (
              <div className="col-4" key={a}>
                <img src={sideimag} className={`img-fluid rounded-3 ${sstatoo.smallImg}`} />
              </div>
            ))}
          </div>

          <div>
            <h6 className={sstatoo.titleRight}>Apartment</h6>

            <div className="d-flex gap-3 small mb-2">
              <span>🛏 4 Beds</span>
              <span>🛁 1 Bath</span>
              <span>📐 400 sqft</span>
            </div>

            <p className="text-muted">
              This well-designed apartment offers a compact yet stylish living space,
              perfect for modern lifestyles.
            </p>

            <button className="btn btn-success px-4 rounded-pill">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className="pagination">
            <li className="page-item"><a className={`page-link ${sstatoo.page}`}>1</a></li>
            <li className="page-item"><a className={`page-link ${sstatoo.page}`}>2</a></li>
            <li className="page-item"><a className={`page-link ${sstatoo.page}`}>3</a></li>
            <li className="page-item"><a className={`page-link ${sstatoo.page}`}>4</a></li>
            <li className="page-item"><a className={`page-link ${sstatoo.page}`}>Next</a></li>
          </ul>
        </nav>
      </div>

    </div>
  );
};
   
export default Lastpage;
