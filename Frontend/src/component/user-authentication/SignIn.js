
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import Navbar from '../Navbar';


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://fit-and-flair.onrender.com/user/login",
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", response.data.token);
      window.location.reload(); 
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(
        "https://fit-and-flair.onrender.com/user/google-signin",
        {
          name: user.displayName,
          email: user.email,
        },
        { withCredentials: true }
      );

      sessionStorage.setItem("token", response.data.token);
      


      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert(error.response?.data?.message || "Google Sign-In failed");
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
          height: "520px",
          width: "370px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontWeight: "bold", color: "#5D432C", marginBottom: "30px" }}>
          Sign In
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
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

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
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

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-danger mt-3"
            style={{
              marginTop: "15px",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Google Sign-In
          </button>

          <p style={{ marginTop: "15px", color: "#5D432C" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ fontWeight: "bold", color: "#000" }}>
              Sign Up
            </Link>
          </p>

          <p style={{ color: "#5D432C", marginTop: "10px" }}>
            <Link to="/forgot" style={{ fontWeight: "bold", color: "#000" }}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  </>
}

export default SignIn;
