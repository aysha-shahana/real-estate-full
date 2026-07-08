import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../assets/axiosConfig";
import BlogDetailsHero from "./BlogDetailsHero";
import styles from "../../assets/BlogDetails.module.css";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const DJANGO_BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const blogRes = await api.get(`/blogs/${slug}/`);
      setBlog(blogRes.data);

      const blogsRes = await api.get("/blogs/");

      const related = blogsRes.data
        .filter(
          (item) =>
            item.slug !== slug &&
            item.category === blogRes.data.category
        )
        .slice(0, 3);

      if (related.length < 3) {
        const remaining = blogsRes.data
          .filter(
            (item) =>
              item.slug !== slug &&
              !related.find((r) => r.id === item.id)
          )
          .slice(0, 3 - related.length);

        setRelatedBlogs([...related, ...remaining]);
      } else {
        setRelatedBlogs(related);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) {
    return (
      <div className={styles.loading}>
        Loading article...
      </div>
    );
  }

  const plainText = blog.content.replace(/<[^>]+>/g, "");

  const readingTime = Math.max(
    1,
    Math.ceil(plainText.split(/\s+/).length / 200)
  );

  return (
    <>
      <BlogDetailsHero blog={blog} />

      <div className={styles.container}>

        <div className={styles.meta}>

          <span className={styles.category}>
            {blog.category}
          </span>

          <span className={styles.date}>
            {new Date(blog.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>

          <span className={styles.readTime}>
            {readingTime} min read
          </span>

        </div>

        <h1 className={styles.title}>
          {blog.title}
        </h1>

        <p className={styles.excerpt}>
          {blog.excerpt}
        </p>

        {blog.featured_image && (
          <img
            src={blog.featured_image}
            alt={blog.title}
            className={styles.image}
          />
        )}

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />

        {/* CTA */}

        <div className={styles.cta}>

          <h3>Looking for Your Dream Property?</h3>

          <p>
            Whether you're buying, selling, or renting,
            our experienced team is here to help you
            find the perfect property.
          </p>

          <div className={styles.buttons}>

            <Link
              to="/buy"
              className={styles.primaryBtn}
            >
              Explore Properties
            </Link>

            <Link
              to="/contact"
              className={styles.secondaryBtn}
            >
              Contact Us
            </Link>

          </div>

        </div>

        <div className={styles.backWrapper}>
          <Link
            to="/blog"
            className={styles.back}
          >
            ← Back to Articles
          </Link>
        </div>

      </div>

      {/* Related Articles */}

      <section className={styles.relatedSection}>

        <div className="container">

          <h2>Related Articles</h2>

          <div className="row g-4">

            {relatedBlogs.map((item) => (

              <div
                className="col-lg-4"
                key={item.id}
              >
                <div className={styles.relatedCard}>

                  {item.featured_image && (
                   <img
  src={item.featured_image}
  alt={item.title}
/>
                  )}

                  <div className={styles.relatedBody}>

                    <span className={styles.relatedCategory}>
                      {item.category}
                    </span>

                    <h5>{item.title}</h5>

                    <p>{item.excerpt}</p>

                    <Link to={`/blog/${item.slug}`}>
                      Read More →
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );
};

export default BlogDetails;