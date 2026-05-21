import React from "react";
import articleone from "../../assets/Imges/Articleone.jpg";
import articletwo from "../../assets/Imges/Articletwo.jpg";
import articletree from "../../assets/Imges/Articletree.jpg";
import articlefor from "../../assets/Imges/articlefor.jpg";
import styles from "../../assets/Articles.module.css";

const article = [
  {
    id: 1,
    tittle: "Real Estate Markets on the Move",
    type: "Apartment",
    date: "March 19, 2024",
    image: articleone,
  },
  {
    id: 2,
    tittle: "Best Place to live & work",
    type: "Apartment",
    date: "March 19, 2024",
    image: articletwo,
  },
  {
    id: 3,
    tittle: "Top 10 Budget-Friendly Cities",
    type: "Single Family",
    date: "March 19, 2024",
    image: articletree,
  },
  {
    id: 4,
    tittle: "Discover modern house",
    type: "Office",
    date: "March 19, 2024",
    image: articlefor,
  },
];

const Articles = () => {
  return (
    <div className=" container mt-3 py-5  ">
    <div className={styles.mainboo}>
      <div className="container ">

        <h2 className={styles.heading}>Recent Articles & News</h2>

        <div className={styles.articleContainer}>
          {article.map((item) => (
            <div className={styles.card} key={item.id}>
              
              <img src={item.image} alt={item.tittle} className={styles.image} />

              <div className={styles.cardBody}>
                <p className={styles.typeDate}>
                  {item.type} • {item.date}
                </p>

                <h4 className={styles.cardTitle}>{item.tittle}</h4>

                <p className={styles.readMore}>Read More →</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Articles;
