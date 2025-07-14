


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        email,
        password,
      });

      alert(response.data.message);
      sessionStorage.setItem("adminToken", response.data.token);
      navigate("/admindashboard"); // Adjust route as needed
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Admin login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 231, 209, 0.9), rgba(230, 193, 168, 0.7)), url('Logo.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          borderRadius: "10px",
          height: "520px",
          width: "370px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold", color: "#5D432C", marginBottom: "30px" }}>
          Admin Sign In
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label htmlFor="email" style={{ fontWeight: "bold", color: "#5D432C" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter admin email"
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

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label htmlFor="password" style={{ fontWeight: "bold", color: "#5D432C" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter admin password"
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
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p style={{ marginTop: "15px", color: "#5D432C", fontWeight: "bold" }}>
            Only authorized admins allowed
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminSignIn;
