import React from 'react'
 import jojo from '../../assets/Imges/agent 1.avif'
import profil from '../../assets/Imges/agent 2.jpg'
import huma from '../../assets/Imges/agent 3.avif'
import man from '../../assets/Imges/agent 4.jpg'

import agent from '../../assets/Agent.module.css'



const agenntdada = [
  {
    id: 1,
    name: "Terrell Norman",
    title: "Real Estate Agent",
    img: jojo,
    office: "(4556) 78998",
    mobile: "987656789",
    email: "Town@1gmail.com",
  },
  {
    id: 2,
    name: "Terrell Norman",
    title: "Real Estate Agent",
    img: profil,
    office: "(4556) 78998",
    mobile: "987656789",
    email: "Town@1gmail.com",
  },
  {
    id: 3,
    name: "Terrell Norman",
    title: "Real Estate Agent",
    img: huma,
    office: "(4556) 78998",
    mobile: "987656789",
    email: "Town@1gmail.com",
  },
  {
    id: 4,
    name: "Terrell Norman",
    title: "Real Estate Agent",
    img: man,
    office: "(4556) 78998",
    mobile: "987656789",
    email: "Town@1gmail.com",
  },
];

const Agentfile = () => {
  return (
    <div className="container mt-3 py-5">
    <div className="text-center mb-5">
  <span className={agent.subTitle}>OUR EXPERTS</span>

  <h2 className={agent.mainTitle}>
    Meet Our Professional Agents
  </h2>

  <p className={agent.desc}>
    Experienced real estate professionals dedicated to helping
    you find the perfect property.
  </p>
</div>

      <div className={agent.agentGrid}>
        {agenntdada.map((item) => (
          <div key={item.id} className={agent.agentCard}>
            <img src={item.img} alt={item.name} className={agent.agentImg} />

            <h3>{item.name}</h3>
            <p className={agent.title}>{item.title}</p>

          <div className={agent.info}>
  <p>
    <i className="bi bi-telephone-fill"></i>
    {item.office}
  </p>

  <p>
    <i className="bi bi-phone-fill"></i>
    {item.mobile}
  </p>

  <p>
    <i className="bi bi-envelope-fill"></i>
    {item.email}
  </p>
</div>

<button className={agent.contactBtn}>
  Contact Agent
</button>         
 </div>
        ))}
      </div>
    </div>
  );
};

export default Agentfile;








