import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Homepage/Home";
import Pagethree from "./Components/Rentpage/Pagethree";
import Mainpart from "./Components/BuyPagee/Mainpart";
import Cannectsigle from "./Components/Singlepage/Cannectsigle";
import "./App.css";
import FooterComponent from "./Components/FooterComponent";
import Partagency from "./Components/Agent/Partagency";
import Mainfail from "./Components/Contact/Mainfail";
import Signup from "./Components/SignUp/Signup";
import Signin from "./Components/SignIn/Signin";
import QuickPropertyForm from "./Components/SellPage/QuickPropertyForm";

function App() {
  return (
    <>
<Navbar/>      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Sell" element={<QuickPropertyForm/>} />
        <Route path="/rent" element={<Pagethree />} />
        <Route path="/buy" element={<Mainpart />} />
        <Route path="/singlepage" element={<Cannectsigle />} />
        <Route path="/Agency" element={<Partagency />} />
        <Route path="/Contact" element={<Mainfail/>}/>
        <Route path="/SignIn" element={<Signin/>}/>
        <Route path="/SignUp" element={<Signup/>}/>
      </Routes>
      
<FooterComponent/>
    </>
  );
}

export default App;
