import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/user/reset", {
        email,
        otp,
        newPassword,
      });
      alert(res.data.message);
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }
    setIsResending(true);
    try {
      const res = await axios.post("http://localhost:5000/user/forgot", { email });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsResending(false);
    }
  };

  return <>
  <Navbar/>
    <div style={styles.container}>
      <div style={styles.box}>
        <h3 style={styles.heading}>Reset Password</h3>
        <form onSubmit={handleReset}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />

          <label style={styles.label}>New Password</label>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.btn}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isResending}
          style={{
            ...styles.btn,
            marginTop: "10px",
            backgroundColor: "#8A5C3B",
            opacity: isResending ? 0.7 : 1,
            cursor: isResending ? "not-allowed" : "pointer",
          }}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
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
    width: "370px",
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
    marginBottom: "15px",
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

export default ResetPassword;
