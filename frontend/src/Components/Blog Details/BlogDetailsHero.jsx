import React from "react";
import choose from "../../assets/choose.module.css";

const BlogDetailsHero = ({ blog }) => {
  return (
    <section className={choose.blogbg}>
      <div className={choose.heroContent}>

        <h1 className={choose.htitle}>
          {blog.title}
        </h1>

        <p className={choose.subText}>
          Published on{" "}
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

      </div>
    </section>
  );
};

export default BlogDetailsHero;