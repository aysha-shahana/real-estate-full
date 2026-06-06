import React from 'react'

import style from '../../assets/Contactpagge.module.css'
 
const Contactpage = () => {
  return (
    <div className={style.contactsection}>
       <div className="container py-5" style={{ marginTop: "50px" }}>
        <div className={style.wrapper}>
          
          {/* LEFT FORM SECTION */}
          <div className={style.formcard}>
            <h3>Get in touch</h3>
            <p>Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus</p>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <input type="text" placeholder="Your phone" />
            <textarea placeholder="Your message"></textarea>
            <button>Send Message</button>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className={style.infowrapper}>
            <h3>
              Feel free to <br /> contact us
            </h3>
            <p>Leo morbi faucibus mattis pharetra</p>

            <ul>
              <li>8911 Tanglewood Ave. Capitol Heights, MD 20743</li>
              <li>(566) 237-4687</li>
              <li>(239) 319-8083</li>
              <li>moinefou@hotmail.com</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contactpage;
