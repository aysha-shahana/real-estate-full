
import React from 'react';
import clip from '../../assets/Ourclient.module.css';



const dadaservice = [
  {
    id:1,
    
    title: "Buy a property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
    button: "Find property",
  },
  {
    id:2,
    title: "Sell a property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
    button: "Learn more",
  },
  {
    id:3,
    title: "Rent a property",
    p: "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
    button: "Find a rent",
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

