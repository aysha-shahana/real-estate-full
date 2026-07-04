import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../assets/axiosConfig";
import styles from "../../assets/Blog.module.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs/");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.page}>
      <div className="container">

        <div className={styles.header}>
          <h1>Our Blog</h1>

          <p>
            Stay updated with expert real estate insights, buying guides,
            investment tips, and property news from Xen Properties.
          </p>
        </div>
 
        <div className="row g-4">
          {blogs.map((blog) => (
            <div className="col-lg-4 col-md-6" key={blog.id}>
              <div className={styles.card}>

                <img
                  src={`${DJANGO_BASE_URL}${blog.featured_image}`}
                  alt={blog.title}
                  className={styles.image}
                />

                <div className={styles.body}>

                  <span className={styles.date}>
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <h3>{blog.title}</h3>

                  <p>{blog.excerpt}</p>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className={styles.button}
                  >
                    Read More →
                  </Link>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;