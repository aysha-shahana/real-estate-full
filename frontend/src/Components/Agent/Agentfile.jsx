import React from 'react'
 import jojo from '../../assets/Imges/jojo.jpg'
import profil from '../../assets/Imges/profile.jpg'
import huma from '../../assets/Imges/human.jpg'
import man from '../../assets/Imges/man.jpg'

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
        <h2>Our Professional Agents Are Here to Guide You</h2>
        <p>Personalized assistance to help you make confident decisions.</p>
      </div>

      <div className={agent.agentGrid}>
        {agenntdada.map((item) => (
          <div key={item.id} className={agent.agentCard}>
            <img src={item.img} alt={item.name} className={agent.agentImg} />

            <h3>{item.name}</h3>
            <p className={agent.title}>{item.title}</p>

            <div className={agent.info}>
              <p>
                <strong>Office:</strong> {item.office}
              </p>
              <p>
                <strong>Mobile:</strong> {item.mobile}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
            </div>

            <button className={agent.contactBtn}>Contact Agent</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agentfile;








