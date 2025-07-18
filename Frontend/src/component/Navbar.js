

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const localToken = sessionStorage.getItem("token");
      setIsLoggedIn(!!user || !!localToken);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/signin");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/bodyshapecalculator", label: "Calculator" },
    { to: "/contact", label: "Contact" },
    { to: "/adminsignin", label: "Admin" },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Dancing+Script&display=swap"
        rel="stylesheet"
      />
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#f8d4a7",
          boxShadow: scrolled ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none",
          transition: "all 0.3s ease",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div className="container-fluid px-3">
          <Link
            className="navbar-brand"
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "700",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              textDecoration: "none",
            }}
          >
            <span style={{ color: "#7b3f00", fontWeight: "bold" }}>FIT</span>
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#b14d2f",
                fontSize: "26px",
              }}
            >
              &
            </span>
            <span style={{ color: "#944a1f", fontWeight: "bold" }}>FLAIR</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "1px solid #4a2c2a",
              backgroundColor: "#f8d4a7",
              padding: "6px",
              borderRadius: "5px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
              <div style={{ width: "24px", height: "2px", backgroundColor: "#4a2c2a", borderRadius: "1px" }} />
              <div style={{ width: "24px", height: "2px", backgroundColor: "#4a2c2a", borderRadius: "1px" }} />
              <div style={{ width: "24px", height: "2px", backgroundColor: "#4a2c2a", borderRadius: "1px" }} />
            </div>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarMenu"
          >
            <ul
              className="navbar-nav mb-2 mb-lg-0 align-items-center"
              style={{ gap: "12px", textAlign: "center" }}
            >
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <Link
                    to={link.to}
                    className="nav-link"
                    style={{
                      color: isActive(link.to) ? "#ff6b6b" : "#4a2c2a",
                      fontWeight: isActive(link.to) ? "bold" : "500",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "17px",
                      transition: "0.3s",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {isLoggedIn ? (
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link"
                    style={{
                      cursor: "pointer",
                      color: "#4a2c2a",
                      fontWeight: "500",
                      fontFamily: "'Playfair Display', serif",
                      textDecoration: "none",
                      fontSize: "17px",
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      to="/signup"
                      className="nav-link"
                      style={{
                        color: isActive("/signup") ? "#ff6b6b" : "#4a2c2a",
                        fontWeight: isActive("/signup") ? "bold" : "500",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "17px",
                        transition: "0.3s",
                      }}
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/signin"
                      className="nav-link"
                      style={{
                        color: isActive("/signin") ? "#ff6b6b" : "#4a2c2a",
                        fontWeight: isActive("/signin") ? "bold" : "500",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "17px",
                        transition: "0.3s",
                      }}
                    >
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
