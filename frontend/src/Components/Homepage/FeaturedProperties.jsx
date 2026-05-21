import React from "react";
import styles from "../../assets/FeaturedProperties.module.css";
import houses from "../../assets/Imges/House.jpg";
const cardData = [
  {
    id: 1,
    img: houses,
    type: "Apartment",
    price: "₹43,657",
    location: "245/12 MG Road, Kochi, Ernakulam, Kerala – 682016",
    beds: 3,
    baths: 2,
    sqft: 1500,
    tags: ["For Buy", "Featured"],
  },
  {
    id: 2,
    img: houses,
    type: "Villa",
    price: "₹1,20,000",
    location: "12 Palm Street, Wayanad, Kerala – 673121",
    beds: 4,
    baths: 3,
    sqft: 2500,
    tags: ["For Rent", "Featured"],
  },
  {
    id: 3,
    img: houses,
    type: "Condominium",
    price: "₹75,000",
    location: "78 Lakeview Ave, Alappuzha, Kerala – 688001",
    beds: 2,
    baths: 2,
    sqft: 1200,
    tags: ["For Buy", "New Listing"],
  },
  {
    id: 4,
    img: houses,
    type: "Townhouse",
    price: "₹60,500",
    location: "34 River Road, Thrissur, Kerala – 680001",
    beds: 3,
    baths: 2,
    sqft: 1400,
    tags: ["For Rent", "Featured"],
  },
  {
    id: 5,
    img: houses,
    type: "Penthouse",
    price: "₹2,50,000",
    location: "90 Skyline Blvd, Kozhikode, Kerala – 673001",
    beds: 5,
    baths: 4,
    sqft: 3500,
    tags: ["For Buy", "Luxury"],
  },
  {
    id: 6,
    img: houses,
    type: "Studio Apartment",
    price: "₹30,000",
    location: "56 Garden St, Kannur, Kerala – 670001",
    beds: 1,
    baths: 1,
    sqft: 800,
    tags: ["For Rent", "New Listing"],
  },
];

const FeaturedProperties = () => {
  return (
<div className="container mt-3 py-5">
  <div className={styles.feature}>

    <h2 className={styles.head}>Featured Properties</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

    <div className="row g-4">
      {cardData.map((card) => (
        <div className="col-12 col-sm-6 col-md-4" key={card.id}>
          
          <div className={`${styles.cardBox} animateCard`}>

            <div className={styles.imageContainer}>
              <img src={houses} alt="Property" className={styles.cardImage} />

              <div className={styles.tagButtons}>
                <button className={styles.buyBtn}>For Buy</button>
                <button className={styles.featureBtn}>Featured</button>
              </div>
            </div>

            <div className={styles.cardBody}>
              <h4 className={styles.cardTitle}>Apartment</h4>
              <p className={styles.price}>₹43,657</p>
              <p className={styles.location}>
                245/12 MG Road, Kochi, Ernakulam, Kerala – 682016
              </p>

              <p className={styles.details}>
                <i className="bi bi-house-door-fill"></i> 3 Beds &nbsp; | &nbsp;
                <i className="bi bi-droplet-half"></i> 2 Baths &nbsp; | &nbsp;
                <i className="bi bi-bounding-box-circles"></i> 1500 Sqft
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>

  </div>
</div>
  )}
export default FeaturedProperties;
