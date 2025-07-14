


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signup } from "../../apis"; // Your custom API handler

import Navbar from '../Navbar';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signup({ name, email, password });

      alert(response.data.message);

      // ✅ Save activationToken for OTP verification page
      sessionStorage.setItem("activationToken", response.data.activationToken);

      navigate("/verify-otp");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return <>
  <Navbar/>
    <div
      style={{
        background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <div style={{ fontSize: "24px", color: "#5D432C" }}>Loading...</div>
      ) : (
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(255, 231, 209, 0.9), rgba(230, 193, 168, 0.7)), url('Logo.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px",
            borderRadius: "10px",
            height: "500px",
            width: "370px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: "bold", color: "#5D432C", marginBottom: "30px" }}>
            Sign Up
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "15px", textAlign: "left" }}>
              <label htmlFor="name" style={{ fontWeight: "bold", color: "#5D432C" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "15px", textAlign: "left" }}>
              <label htmlFor="email" style={{ fontWeight: "bold", color: "#5D432C" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "15px", textAlign: "left" }}>
              <label htmlFor="password" style={{ fontWeight: "bold", color: "#5D432C" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginTop: "5px",
                }}
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              style={{
                backgroundColor: "#5D432C",
                color: "#fff",
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Sign Up
            </button>

            {/* Navigation Link */}
            <p style={{ marginTop: "5px", color: "#5D432C" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ fontWeight: "bold", color: "#000" }}>
                Sign In
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
</>
}

export default SignUp;
