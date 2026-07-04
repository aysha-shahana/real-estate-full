import React, { useEffect, useState } from "react";
import api from "../../assets/axiosConfig";

import style from "../../assets/Contactpagge.module.css";

const Contactpage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [contactInfo, setContactInfo] = useState(null);

const fetchContactInfo = async () => {
  try {
const res = await api.get("/contact-info/"); 
   setContactInfo(res.data);
  } catch (err) {
    console.error("Failed to fetch contact info:", err);
  }
};

useEffect(() => {
  fetchContactInfo();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
       const res = await api.post("/contact/", formData);
    alert(res.data.message || "Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Something went wrong."
    );
  }
};

  return (
    <div className={style.contactsection}>
      <div className="container py-5">
        <div className={style.wrapper}>
          {/* LEFT FORM SECTION */}
          <div className={style.formcard}>
            <h3>Get in touch</h3>

            <p>
              Connect with our dedicated property specialists for expert advice,
              personalized solutions, and a seamless real estate experience
              tailored to your needs.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Your phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />

              <button type="submit">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT INFO SECTION */}
          <div className={style.infowrapper}>
            <span className={style.subTitle}>CONTACT US</span>

            <h3>
              Feel Free To
              <br />
              Contact Us
            </h3>

            <p>
              Our experienced team is ready to help you find, buy, rent, or
              sell your ideal property.
            </p>

            <ul>
             <li>
  <i className="bi bi-geo-alt-fill"></i>
  {contactInfo?.address || "Loading..."}
</li>

<li>
  <i className="bi bi-telephone-fill"></i>
  {contactInfo?.phone || "Loading..."}
</li>

<li>
  <i className="bi bi-phone-fill"></i>
  {contactInfo?.whatsapp || "Loading..."}
</li>

<li>
  <i className="bi bi-envelope-fill"></i>
  {contactInfo?.email || "Loading..."}
</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactpage;