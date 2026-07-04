import React, { useEffect, useState } from "react";
import api from "../../assets/axiosConfig";
import { Link } from "react-router-dom";
import styles from "../../assets/Articles.module.css";

const Articles = () => {
  const [blogs, setBlogs] = useState([]);

  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/");

      // Latest 3 blogs
      setBlogs(res.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 py-5">
      <div className={styles.mainboo}>
        <div className="container">
<div className={styles.top}>
    <h2 className={styles.heading}>
        Recent Articles & News
    </h2>

    <Link
        to="/blog"
        className={styles.viewAll}
    >
        View All →
    </Link>
</div>
          <div className={styles.articleContainer}>
            {blogs.map((item) => {
              const imageUrl = `${DJANGO_BASE_URL}${item.featured_image}`;

              return (
                <div className={styles.card} key={item.id}>
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className={styles.image}
                  />

                  <div className={styles.cardBody}>
                    <p className={styles.typeDate}>
                      {new Date(item.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <h4 className={styles.cardTitle}>{item.title}</h4>

                    <Link
                      to={`/blog/${item.slug}`}
                      className={styles.readMore}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;