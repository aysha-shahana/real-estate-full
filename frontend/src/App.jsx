import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Home from "./Components/Homepage/Home";

import Pagethree from "./Components/Rentpage/Pagethree";

import Mainpart from "./Components/BuyPagee/Mainpart";

import Cannectsigle from "./Components/Singlepage/Cannectsigle";

import FooterComponent from "./Components/FooterComponent";

import Partagency from "./Components/Agent/Partagency";

import Mainfail from "./Components/Contact/Mainfail";

import Signup from "./Components/SignUp/Signup";

import Signin from "./Components/SignIn/Signin";

import "./App.css";
import Profile from "./Components/Profile";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import AddProperty from "./Components/Addproperty/AddProperty";
import MyProperties from "./Components/MyProperties/MyProperties";
import Editproperties from "./Components/Edit Properties/Editproperties";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import BuyPropertyDetails from "./Components/BuypropertyDetails/BuyPropertyDetails";
import VisitRequest from "./Components/Visit Request/VisitRequest";
import ContactLeads from "./Components/Contact Leads/ContactLeads";
import Bloghome from "./Components/Blog Page/Bloghome";
import BlogDetails from "./Components/Blog Details/BlogDetails";
// import ApplyForRent from "./Components/Apply for rent/ApplyForRent";



function App() {
  const location = useLocation();

  // HIDE NAVBAR + FOOTER

  const hideLayoutRoutes = [
    "/signin",
    "/signup",
    "/dashboard",
    "/add-property",
    "/my-properties",
    "/edit-property/:id",
    "/profile",
    "/visit-requests",
    "/contact-leads",
  ];

  const hideLayout =
    hideLayoutRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/edit-property/");

  return (
    <>
      {/* NAVBAR */}

      {!hideLayout && <Navbar />}

      {/* ROUTES */}

      <Routes>
      
    <Route path="/" element={<Home />} />
    <Route path="/rent" element={<Pagethree />} />
    <Route path="/buy" element={<Mainpart />} />

  
    <Route path="/dashboard" element={<UserDashboard />} />
    <Route path="/add-property" element={<AddProperty />} />
    <Route path="/visit-requests" element={<VisitRequest />} />


  
        <Route path="/my-properties" element={<MyProperties />} />

        <Route path="/contact-leads" element={<ContactLeads />} />

        <Route path="/edit-property/:id" element={<Editproperties />} />

       
        <Route path="/profile" element={<Profile />} />

        <Route path="/singlepage" element={<Cannectsigle />} />

        <Route path="/agency" element={<Partagency />} />

        <Route path="/contact" element={<Mainfail />} />

        <Route path="/buy-property/:id" element={<BuyPropertyDetails />} />

        <Route path="/property/:id" element={<PropertyDetails />} /> 

<Route
  path="/blog"
  element={<Bloghome />}
/>

<Route
  path="/blog/:slug"
  element={<BlogDetails />}
/>




        {/* <Route path="/apply-for-rent/:id" element={<ApplyForRent />} /> */}
        
        <Route path="/signin" element={<Signin />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>

      {/* FOOTER */}

      {!hideLayout && <FooterComponent />}
    </>
  );
}

export default App;
