import React, { useState } from "react";

import api from "../../assets/axiosConfig";

import { Link, useNavigate } from "react-router-dom";

import styles from "../../assets/Signup.module.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
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
      await api.post("/signup/", form);

      alert("Signup successful!");

      navigate("/signin");
    } catch (err) {
      console.log(err);

      setError("Signup failed");
    }
  }

  return (
    <div className={styles.signupPage}>
      <div className={styles.card}>
        <h2>Create Account</h2>

        <p>Signup to continue</p>

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

          {/* EMAIL */}

          <div className={styles.formGroup}>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
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

          <button type="submit" className={styles.signupBtn}>
            Signup
          </button>
        </form>

        {/* SIGNIN */}

        <div className={styles.bottomText}>
          Already have an account?
          <Link to="/signin">Signin</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
