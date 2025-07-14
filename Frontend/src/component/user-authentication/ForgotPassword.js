import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("https://fit-and-flair.onrender.com/user/forgot", { email });
      alert(res.data.message);
      navigate("/reset-password");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return <>
  <Navbar/>
    <div style={styles.container}>
      <div style={styles.box}>
        <h3 style={styles.heading}>Forgot Password</h3>
        <form onSubmit={handleSendOtp}>
          <label style={styles.label}>Enter your email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  </>

}

const styles = {
  container: {
    background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundImage: `linear-gradient(rgba(255, 231, 209, 0.9), rgba(230, 193, 168, 0.7)), url('Logo.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  heading: {
    color: "#5D432C",
    fontWeight: "bold",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    color: "#5D432C",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  btn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#5D432C",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
  },
};

export default ForgotPassword;
