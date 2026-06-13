import React from 'react'

import style from '../../assets/Contactpagge.module.css'
 
const Contactpage = () => {
  return (
    <div className={style.contactsection}>
       <div className="container py-5">
        <div className={style.wrapper}>
          
          {/* LEFT FORM SECTION */}
          <div className={style.formcard}>
            <h3>Get in touch</h3>
            <p>Connect with our dedicated property specialists for expert
  advice, personalized solutions, and a seamless real estate
  experience tailored to your needs.</p>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="text" placeholder="Your phone" />
            <textarea placeholder="Your message"></textarea>
            <button>Send Message</button>
          </div>

          {/* RIGHT INFO SECTION */}
         <div className={style.infowrapper}>

  <span className={style.subTitle}>
    CONTACT US
  </span>

  <h3>
    Feel Free To
    <br />
    Contact Us
  </h3>

  <p>
    Our experienced team is ready to help you find,
    buy, rent, or sell your ideal property.
  </p>

  <ul>
    <li>
      <i className="bi bi-geo-alt-fill"></i>
      8911 Tanglewood Ave. Capitol Heights, MD 20743
    </li>

    <li>
      <i className="bi bi-telephone-fill"></i>
      (566) 237-4687
    </li>

    <li>
      <i className="bi bi-phone-fill"></i>
      (239) 319-8083
    </li>

    <li>
      <i className="bi bi-envelope-fill"></i>
      moinefou@hotmail.com
    </li>
  </ul>

</div>

        </div>
      </div>
    </div>
  );
};

export default Contactpage;
