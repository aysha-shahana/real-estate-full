import React, { useState } from "react";

import axios from "axios";

import { useNavigate, useLocation, Link } from "react-router-dom";

import styles from "../../assets/Signin.module.css";

function Signin() {
  const navigate = useNavigate();

  const location = useLocation();

  const redirectPath = location.state?.from || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // INPUT CHANGE

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // SUBMIT

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        form,
      );

      // STORE TOKENS

      localStorage.setItem("username", form.username);

      localStorage.setItem("access_token", response.data.access);

      localStorage.setItem("refresh_token", response.data.refresh);

      navigate(redirectPath);
    } catch (err) {
      console.log(err);

      setError("Invalid username or password");
    }
  }

  return (
    <div className={styles.signinPage}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h2>Welcome Back</h2>

        <p>Sign in to continue</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* USERNAME */}

          <div className={styles.formGroup}>
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD */}

          <div className={styles.formGroup}>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}

          <button type="submit" className={styles.signinBtn}>
            Signin
          </button>
        </form>

        {/* SIGNUP */}

        <div className={styles.bottomText}>
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
