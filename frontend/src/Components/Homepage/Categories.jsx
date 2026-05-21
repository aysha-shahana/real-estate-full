import React from 'react'
import catego from '../../assets/Categories.module.css';


const citiesdata = [
  { id:1, name:"Town House", count:"2 properties", icon:"bi bi-house-door-fill" },
  { id:2, name:"Morden villa", count:"10 properties", icon:"bi bi-building" },
  { id:3, name:"Apartment", count:"3 properties", icon:"bi bi-building-fill" },
  { id:4, name:"Office", count:"7 properties", icon:"bi bi-briefcase-fill" },
  { id:5, name:"Single Family", count:"6 properties", icon:"bi bi-house-door-fill" }
];

  const Categories = () => {
  return (
    <div className="container mt-3 py-5">
      <div className={catego.maincateco}>

        <h3 className="text-light container">Featured Categories</h3>
        <p className="text-light container">
          Buy, sell, or rent properties effortlessly with expert guidance and verified listings you can trust.
        </p>

        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
          {citiesdata.map((city, index) => (
            <div
              key={index}
              className={`shadow-sm ${catego['city-card']}`}
            >
              <div className={catego.cityimage}>
                <i className={city.icon} style={{ fontSize: "32px" }}></i>
              </div>

              <p>{city.name}</p>
              <small>{city.count}</small>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};



 


export default Categories;
