import React from 'react';
import footer from '../assets/FooterComponent.module.css';

const FooterComponent = () => {
  return (
   <footer className={footer.footerWrapper}>
  <div className="container py-5">

    {/* Top Branding + Social */}
    <div className="row mb-5 align-items-center">
      <div className="col-md-6 mb-3 mb-md-0">
        <h3 className={footer.logo}>HomeRetro</h3>
      </div>

      <div className="col-md-6 d-flex justify-content-md-end justify-content-start align-items-center flex-wrap gap-3">
        <span className="fw-semibold">Follow Us:</span>

        <div className="d-flex gap-3">
          <a href="#" className={footer.socialIcon}><i className="bi bi-facebook"></i></a>
          <a href="#" className={footer.socialIcon}><i className="bi bi-twitter"></i></a>
          <a href="#" className={footer.socialIcon}><i className="bi bi-instagram"></i></a>
          <a href="#" className={footer.socialIcon}><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="row gy-4">

      {/* Subscribe */}
      <div className="col-md-4">
        <h4 className={footer.heading}>Subscribe</h4>
        <div className="input-group mb-2">
          <input
            type="email"
            className={`form-control ${footer.input}`}
            placeholder="Your email please"
          />
          <button className={`btn ${footer.sendBtn}`}>Send</button>
        </div>
        <p className={footer.textSmall}>
          Subscribe to our newsletter to receive our weekly feed.
        </p>
      </div>

      {/* Discover */}
      <div className="col-6 col-md-2">
        <h4 className={footer.heading}>Discover</h4>
        <ul className={footer.list}>
          <li>Wayanad</li>
          <li>Kollam</li>
          <li>Thiruvananthapuram</li>
          <li>Kannur</li>
          <li>Kochi</li>
        </ul>
      </div>

      {/* Quick Links */}
      <div className="col-6 col-md-2">
        <h4 className={footer.heading}>Quick Links</h4>
        <ul className={footer.list}>
          <li>Home</li>
          <li>Sell</li>
          <li>Rent</li>
          <li>Buy</li>
          <li>Agency</li>
          <li>Contact</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-6 col-md-2">
        <h4 className={footer.heading}>Contact Us</h4>
        <ul className={footer.list}>
          <li>vi@HomeRetro.com</li>
          <li>+91 67450 97562</li>
        </ul>
      </div>

      {/* Address */}
      <div className="col-6 col-md-2">
        <h4 className={footer.heading}>Our Address</h4>
        <p className={footer.textSmall}>
          99 Fifth Avenue, 3rd Floor <br />
          San Francisco, CA 1980
        </p>
      </div>

    </div>

    {/* Bottom */}
    <div className="text-center mt-4 pt-3 border-top">
      <p className={footer.copy}>© 2025 HomeRetro. All rights reserved.</p>
    </div>

  </div>
</footer>

  );
};

export default FooterComponent;
