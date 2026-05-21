import React from "react";
import one from '../../assets/Imges/keralaone.jpg';
import two from '../../assets/Imges/keralathree.jpg';
import three from '../../assets/Imges/keralafor.jpg';
import styles from "../../assets/CitiesRow.module.css";

const cities = [
  { name: "Wayanad", img: one, properties: 5 },
  { name: "Kannur", img: two, properties: 3 },
  { name: "Kozhikode", img: three, properties: 4 },
  { name: "Kochi", img: one, properties: 1 },
  { name: "Trivandrum", img: two, properties: 2 },
];

const CitiesRow = () => {
  return (
    <div className="container mt-5 py-5">      
      <div className="text-center mb-5  continer">
        <h2 className="fw-bold text-align: start ">Find Properties in These Cities</h2>
        <p className="text-muted">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div className='container'>

     
      <div className="d-flex flex-wrap justify-content-center gap-5 mt-3">
        {cities.map((city, index) => (
  
          <div key={index} className={styles.Container}>
            
            <img
              className={styles.cardImg}
              src={city.img}
              alt={city.name}
            />

            <div className={styles.cardparat}>
              <h6>{city.name}</h6>
              <p>{city.properties} properties</p>
            </div>

          </div>
        ))}
      </div>
 </div>
    </div>
  );
};


export default CitiesRow;

  //   <div className={styles.citiesContainer}>
  //     {cities.map((city, index) => (
  //       <div className={styles.cityCard} key={index}>

  //         <img src={city.img} alt={city.name} className={styles.cityImg} />

  //         <div className={styles.cityInfo}>
  //           <h5>{city.name}</h5>
  //           <p>{city.properties} properties</p>
  //         </div>

  //       </div>
  //     ))}
  //   </div>
  // );

