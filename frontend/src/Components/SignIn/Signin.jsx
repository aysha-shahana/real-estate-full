import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "../../assets/Signin.module.css";

function Signin() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
  location.state?.redirectTo || "/";
  
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    try {
      console.log("FORM DATA:", form);

      // LOGIN
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        form
      );

      console.log("TOKEN RESPONSE:", response.data);

      const accessToken = response.data.access;

      localStorage.setItem(
        "access_token",
        accessToken
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      // CURRENT USER
      const userResponse = await axios.get(
        "http://127.0.0.1:8000/api/current-user/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(
        "CURRENT USER:",
        userResponse.data
      );

      localStorage.setItem(
        "username",
        userResponse.data.username
      );

      navigate(redirectPath);

    } catch (err) {
      console.log("LOGIN ERROR");
      console.log(err.response);
      console.log(err.response?.data);

      setError(
        err.response?.data?.detail ||
          "Login Failed"
      );
    }
  }

  return (
    <div className={styles.signinPage}>
      <div className={styles.overlay}></div>

      <div className={styles.card}>
        <h2>Welcome Back</h2>

        <p>Sign in to continue</p>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className={styles.signinBtn}
          >
            Sign In
          </button>
        </form>

        <div className={styles.bottomText}>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;