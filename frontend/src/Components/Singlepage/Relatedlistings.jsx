
import React from 'react'
import last from '../../assets/Imges/lastimg.jpg'
import downlod from '../../assets/Imges/download.jpg'
import imagess from '../../assets/Imges/images.jpg'
import jopart from '../../assets/Imges/joroom.jpg'

const dataca = [
  {
    id: 1,
    img: last,
    title: "Division Road Apartment",
    sub: "506 Division Road Pembroke Pines, FL 33028",
    price: "$120,000",
    Bedrooms: 2,
    Bathrooms: 1,
    Totalarea: 140,
    Garages: 0
  },
  {
    id: 2,
    img: downlod,
    title: "Division Road Apartment",
    sub: "506 Division Road Pembroke Pines, FL 33028",
    price: "$120,000",
    Bedrooms: 2,
    Bathrooms: 1,
    Totalarea: 140,
    Garages: 0
  },
  {
    id: 3,
    img: imagess,
    title: "Division Road Apartment",
    sub: "506 Division Road Pembroke Pines, FL 33028",
    price: "$120,000",
    Bedrooms: 2,
    Bathrooms: 1,
    Totalarea: 140,
    Garages: 0
  },
  {
    id: 4,
    img: jopart,
    title: "Division Road Apartment",
    sub: "506 Division Road Pembroke Pines, FL 33028",
    price: "$120,000",
    Bedrooms: 2,
    Bathrooms: 1,
    Totalarea: 140,
    Garages: 0
  }
];

const Relatedlistings = () => {
  return (
    <div className="container mt-5 py-5">
      <h2 className="fw-bold">Related Listings</h2>
      <h6 className="text-muted mt-3" >Additional listings that match your criteria</h6>

      <div className="row mt-4">
        {dataca.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card shadow-sm h-100">
              <img
                src={item.img}
                alt="listing"
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body">
                <h5 className="card-title mb-1">{item.title}</h5>
                <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                  {item.sub}
                </p>

                <p className="fw-bold text-success">{item.price}</p>

                {/* ICON SECTION */}
                <div className="d-flex justify-content-between text-muted mt-3" style={{ fontSize: "14px" }}>
                  <span><i className="bi bi-bed me-1"></i>{item.Bedrooms}</span>
                  <span><i className="bi bi-droplet me-1"></i>{item.Bathrooms}</span>
                  <span><i className="bi bi-bounding-box me-1"></i>{item.Totalarea}sqft</span>
                  <span><i className="bi bi-car-front me-1"></i>{item.Garages}</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Relatedlistings;
