// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";
// import buying from '../../assets/buying.module.css';

// const Propertyarea = () => {
//   // State
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Django Base URL
//   const DJANGO_BASE_URL = 'http://127.0.0.1:8000';

//   // Fetch Buy Properties
//   useEffect(() => {

//    api.get(`${DJANGO_BASE_URL}/api/buy-properties/`)
//       .then((response) => {
//         setProperties(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to load properties");
//         setLoading(false);
//       });
//   }, []);

//   // Loading State
//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <h3>Loading properties...</h3>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="text-center mt-5 text-danger">
//         <h3>{error}</h3>
//       </div>
//     );
//   }
//   return (

//     <section className="mt-4">
//       <div className="container">

//         {/* Title */}
//         <h2 className="mb-3 fw-bold mt-3 py-5 text-center">
//           Premium Communities for Confident Home Buying
//         </h2>

//         {/* Cards */}
//         <div className="row g-4">

//           {properties.map((item) => {

//             // Full image URL
//             const imageUrl = `${DJANGO_BASE_URL}${item.image}`;

//             return (

//               <div className="col-12 col-sm-6 col-md-4" key={item.id}>

//                 <div
//                   className="card shadow-sm p-3"
//                   style={{ borderRadius: "12px" }}
//                 >

//                   {/* Image */}
//                   <div style={{ position: "relative" }}>

//                     <img
//                       src={imageUrl}
//                       alt={item.title}
//                       className="img-fluid rounded mb-3"
//                       style={{
//                         height: "200px",
//                         width: "100%",
//                         objectFit: "cover"
//                       }}
//                     />

//                     {/* Buttons */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "10px",
//                         display: "flex",
//                         gap: "6px",
//                       }}
//                     >

//                       <div className={buying.sebut}>
//                         <Link to="/singlepage">
//                           <button className="btn btn-sm text-white">
//                             For Buy
//                           </button>
//                         </Link>
//                       </div>

//                       {item.is_featured && (
//                         <div className={buying.febut}>
//                           <button className="btn btn-sm text-dark">
//                             Featured
//                           </button>
//                         </div>
//                       )}

//                     </div>
//                   </div>

//                   {/* Content */}
//                   <h5 className="fw-bold">{item.title}</h5>
//                   <p className="text-primary fw-bold">
//                     ₹{item.price}
//                   </p>

//                   <p className="text-muted">
//                     {item.address}
//                   </p>

//                   {/* Details */}
//                   <div className="d-flex justify-content-between text-center mt-3">

//                     <div>
//                       <i className="bi bi-house-door"></i>
//                       <p className="m-0">{item.beds} Beds</p>
//                     </div>

//                     <div>
//                       <i className="bi bi-droplet"></i>
//                       <p className="m-0">{item.baths} Baths</p>
//                     </div>

//                     <div>
//                       <i className="bi bi-aspect-ratio"></i>
//                       <p className="m-0">{item.sqft} Sqft</p>
//                     </div>

//                   </div>

//                 </div>

//               </div>

//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Propertyarea;
