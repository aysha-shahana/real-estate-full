import React from "react";
import choose from "../../assets/choose.module.css";

const BlogHero = () => {
  return (
    <section className={choose.blogbg}>
      <div className={choose.heroContent}>

        <h1 className={choose.htitle}>
          Real Estate
          <br />
          Insights & Articles
        </h1>

        <p className={choose.subText}>
        Explore expert property advice, investment insights,
        home buying guides, and the latest real estate trends
        from Xen Properties.
        </p>

      </div>
    </section>
  );
};

export default BlogHero;