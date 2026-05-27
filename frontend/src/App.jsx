import React from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

import QuickPropertyForm from "./Components/SellPage/QuickPropertyForm";

import "./App.css";
import Profile from "./Components/Profile";

function App() {

  const location = useLocation();

  // HIDE NAVBAR + FOOTER

  const hideLayoutRoutes = [
    "/signin",
    "/signup",
  ];

  const hideLayout =
    hideLayoutRoutes.includes(
      location.pathname.toLowerCase()
    );

  return (
    <>

      {/* NAVBAR */}

      {!hideLayout && <Navbar />}

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/add-property"
          element={<QuickPropertyForm />}
        />

        <Route
          path="/rent"
          element={<Pagethree />}
        />

        <Route
          path="/buy"
          element={<Mainpart />}
        />
        <Route 
        path="/profile"
        element={<Profile />}
        />

        <Route
          path="/singlepage"
          element={<Cannectsigle />}
        />

        <Route
          path="/agency"
          element={<Partagency />}
        />

        <Route
          path="/contact"
          element={<Mainfail />}
        />

        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

      {/* FOOTER */}

      {!hideLayout && <FooterComponent />}

    </>
  );
}

export default App;