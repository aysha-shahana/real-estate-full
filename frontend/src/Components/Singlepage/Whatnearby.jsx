

import React from 'react';
import lohome from '../../assets/Imges/rooms.jpg';
import hehome from '../../assets/Imges/Rootwo.jpg';
import bothimg from '../../assets/Imges/roomstar.jpg';
import starimg from '../../assets/Imges/helthroom.jpg';
import newroom from '../../assets/Imges/Roomone.jpg';

const data = [
  { id: 1,
     img: lohome,
      title: "Division Road Apartment",
       p: "Division Road Pembroke Pines",
        price: "$550099" },
  { id: 2,
     img: hehome,
      title: "North Road House",
       p: "North Road Piscataway",
        price: "$750000" },
  { id: 3,
     img: bothimg, 
     title: "Rockville Ave Villa",
      p: "Smoky Hollow St. Sulphur, LA 70663",
       price: "$657800" },
  { id: 4,
     img: starimg,
      title: "Lees Creek House",
       p: "Lees Creek St. Dayton",
        price: "$456800" },
  { id: 5,
     img: newroom,
      title: "Scotch Plains Villa",
       p: "Ohio Road Scotch Plains",
        price: "$657800" }
];



const WhatNearby = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: What's Nearby */}
        <div className="col-md-6">
          <h4>What’s nearby</h4>

          {/* Education */}
          <div className="mt-3">
            <h5><i className="bi bi-mortarboard me-2"></i> Education</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <span>Allen Academy</span>
                <span>0.089 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>St. Joseph School</span>
                <span>0.028 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>George Washington School</span>
                <span>0.059 mile</span>
              </li>
            </ul>
            <hr className="my-3" />
          </div>

          {/* Health */}
          <div>
            <h5 className="mt-3"><i className="bi bi-hospital me-2"></i> Health & Medicine</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <span>Health Center One</span>
                <span>0.089 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Community Clinic</span>
                <span>0.028 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>City Medical Point</span>
                <span>0.059 mile</span>
              </li>
            </ul>
            <hr className="my-3" />
          </div>

          {/* Food */}
          <div>
            <h5 className="mt-3"><i className="bi bi-egg-fried me-2"></i> Food</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <span>Café Aroma</span>
                <span>0.0456 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Green Leaf Restaurant</span>
                <span>0.345 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Urban Tastes Diner</span>
                <span>0.567 mile</span>
              </li>
            </ul>
            <hr className="my-3" />
          </div>

          {/* Culture */}
          <div>
            <h5 className="mt-3"><i className="bi bi-people me-2"></i> Culture</h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between">
                <span>City Art Center</span>
                <span>0.875 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Community Cultural Hall</span>
                <span>0.556 mile</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>National Heritage Museum</span>
                <span>0.765 mile</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Related Listings */}
        <div className="col-md-6">
          <h4>Related Listings</h4>
          <div className="row mt-3">
            {data.map((item) => (
              <div className="col-12 mb-3" key={item.id}>
                <div className="card shadow-sm d-flex flex-row" style={{ height: "120px" }}>
                  {/* Left: Image */}
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "40%", objectFit: "cover" }}
                  />
                  {/* Right: Content */}
                  <div className="card-body d-flex flex-column justify-content-center" style={{ width: "60%" }}>
                    <h5 className="card-title mb-1">{item.title}</h5>
                    <h6 className="card-title mb-1">{item.p}</h6>
                    <p className="card-text mb-0">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatNearby;



