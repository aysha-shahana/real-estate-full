import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Save user data into localStorage (BEGINNER-FRIENDLY)
    localStorage.setItem("user", JSON.stringify(form));

    alert("Signup successful!");
    navigate("/signin");
  }

  return (
    <div style={{ maxWidth: "350px", margin: "60px auto" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: "100%", margin: "10px 0", padding: "8px" }}
        />

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
          Signup
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/signin">Signin</Link>
      </p>
    </div>
  );
}

export default Signup;
