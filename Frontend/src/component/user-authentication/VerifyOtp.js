import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    const activationToken = sessionStorage.getItem("activationToken");

    if (!activationToken) {
      alert("Activation token not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/user/verify", {
        otp,
        activationToken,
      });

      alert(response.data.message);
      sessionStorage.removeItem("activationToken");
      navigate("/signin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "OTP verification failed");
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
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 231, 209, 0.9), rgba(230, 193, 168, 0.7)), url('Logo.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px",
          borderRadius: "10px",
          height: "400px",
          width: "370px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold", color: "#5D432C", marginBottom: "30px" }}>
          Verify OTP
        </h3>
        <form onSubmit={handleVerify}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              htmlFor="otp"
              style={{ fontWeight: "bold", color: "#5D432C" }}
            >
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
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
            Verify
          </button>
        </form>
      </div>
    </div>
  </>
}

export default VerifyOtp;
