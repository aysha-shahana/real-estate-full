// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import secondcom from "../../assets/Pagethreecss/Second.module.css";

// const Secondcom = () => {
//   // 1. Define dynamic state for listings
//   const [secondcard, setSecondcard] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 2. Base URL config for your Django server images
//   const DJANGO_BASE_URL = "http://127.0.0.1:8000";

//   // 3. Fetch data from backend on mount
//   useEffect(() => {
//     axios
//       .get(`${DJANGO_BASE_URL}/api/rent-properties/`)
//       .then((response) => {
//         setSecondcard(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching listings:", err);
//         setError("Failed to load listings. Check Django console.");
//         setLoading(false);
//       });
//   }, []);

//   // 4. Handle loading and error states gracefully
//   if (loading)
//     return (
//       <div className="text-center my-5">
//         <h4>Loading properties...</h4>
//       </div>
//     );
//   if (error)
//     return (
//       <div className="text-center my-5 text-danger">
//         <h4>{error}</h4>
//       </div>
//     );

//   return (
//     <section className="mt-4">
//       <div className="container py-5">
//         <div className={secondcom.headoo}>
//           <h2 className="mb-4 text-center fw-bold">
//             Trusted Expertise for a Smooth Rental Journey
//           </h2>
//         </div>

//         <div className="row g-4 mt-3">
          
//           {secondcard.map((item) => {
//             const imageUrl = `${DJANGO_BASE_URL}${item.image}`;
//             return (
//               <div className="col-md-4" key={item.id}>
//                 <div
//                   className="card shadow-sm p-3"
//                   style={{ borderRadius: "12px" }}
//                 >
//                   {/* Image */}
//                   <div style={{ position: "relative" }}>
//                     <img
//                       src={imageUrl}
//                       alt={item.head || item.title}
//                       className="img-fluid rounded mb-3"
//                       style={{
//                         height: "200px",
//                         width: "100%",
//                         objectFit: "cover",
//                       }}
//                     />

//                     {/* Tag buttons */}
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "10px",
//                         display: "flex",
//                         gap: "6px",
//                       }}
//                     >
//                       {/* Conditional tags based on Django fields */}
//                       <div className={secondcom.buttonr}>
//                         <button className="btn btn-sm text-white">
//                           For Rent
//                         </button>
//                       </div>
//                       {item.is_featured && (
//                         <div className={secondcom.buttonf}>
//                           <button className="btn btn-sm text-dark">
//                             Featured
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Card Content */}
//                   <h5 className="fw-bold">{item.head || item.title}</h5>
//                   <h4 className="text-primary fw-bold">₹{item.price}</h4>

//                   <p className="text-muted">{item.location || item.address}</p>

//                   <div className="d-flex justify-content-between text-center mt-3">
//                     <div>
//                       <i className="bi bi-house-door-fill"></i>
//                       <p className="m-0">{item.beds} Beds</p>
//                     </div>

//                     <div>
//                       <i className="bi bi-droplet-half"></i>
//                       <p className="m-0">{item.baths} Baths</p>
//                     </div>

//                     <div>
//                       <i className="bi bi-bounding-box-circles"></i>
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

// export default Secondcom;
