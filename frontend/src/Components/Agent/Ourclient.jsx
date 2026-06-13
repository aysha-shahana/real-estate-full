
import React from 'react';
import clip from '../../assets/Ourclient.module.css';



const dadaservice = [
  {
    id: 1,
    icon: "bi bi-house-heart",
    title: "Buy a Property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus.",
    button: "Read More",
  },
  {
    id: 2,
    icon: "bi bi-currency-dollar",
    title: "Sell Your Property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus.",
    button: "Learn More",
  },
  {
    id: 3,
    icon: "bi bi-key",
    title: "Rent a Property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus.",
    button: "Read More",
  },
];


const Ourclient = () => {
  return (
    <div className={clip.bagro}>
    <div className="container ">
      <div className={clip.clientsection}>
        <h2 className={clip.centerhead}>Our client’s success is our success.</h2>
        {dadaservice.map((item, id) => (
          <div key={id} className={clip.sarvicecard}>
            <i className={item.icon}></i>
            <h3>{item.title}</h3>
            <p>{item.p}</p>
            <button>{item.button}</button>
          </div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default Ourclient;

