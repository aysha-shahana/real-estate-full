import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      alert("Login successful!");
    } else {
      alert("Invalid email or password");
    }
  }

  return (
    <div style={{ maxWidth: "350px", margin: "60px auto" }}>
      <h2>Signin</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Signin
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        New User? <Link to="/">Signup</Link>
      </p>
    </div>
  );
}

export default Signin;
