// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function ApplyForRent() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   useEffect(() => {
//   const token = localStorage.getItem("access_token");

//   if (!token) {
//     navigate("/signin");
//   }
// }, []);

//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     occupation: "",
//     monthly_income: "",
//     occupants: 1,
//     move_in_date: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

      
// const token = localStorage.getItem("access_token");
// console.log("TOKEN =", token);

// await axios.post(
//   `http://127.0.0.1:8000/api/apply-for-rent/${id}/`,
//   formData,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
// );

//       alert("Rental application submitted successfully");

//       navigate("/rent-properties");
//     } catch (error) {
//       console.error(error.response?.data || error);
//       alert("Failed to submit application");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5" style={{ marginTop: "100px" }}>
//       <div
//         className="card shadow border-0"
//         style={{ maxWidth: "800px", margin: "auto" }}
//       >
//         <div className="card-body p-4">
//           <h2 className="text-center mb-4">
//             Apply For Rent
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="full_name"
//                   className="form-control"
//                   value={formData.full_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   className="form-control"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>Occupation</label>
//                 <input
//                   type="text"
//                   name="occupation"
//                   className="form-control"
//                   value={formData.occupation}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>Monthly Income</label>
//                 <input
//                   type="number"
//                   name="monthly_income"
//                   className="form-control"
//                   value={formData.monthly_income}
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="col-md-6 mb-3">
//                 <label>Number of Occupants</label>
//                 <input
//                   type="number"
//                   name="occupants"
//                   className="form-control"
//                   value={formData.occupants}
//                   onChange={handleChange}
//                   min="1"
//                 />
//               </div>

//               <div className="col-md-12 mb-3">
//                 <label>Move In Date</label>
//                 <input
//                   type="date"
//                   name="move_in_date"
//                   className="form-control"
//                   value={formData.move_in_date}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="col-md-12 mb-4">
//                 <label>Message</label>
//                 <textarea
//                   name="message"
//                   rows="5"
//                   className="form-control"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Tell the owner about yourself..."
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-success w-100"
//               disabled={loading}
//             >
//               {loading
//                 ? "Submitting..."
//                 : "Submit Rental Application"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ApplyForRent;