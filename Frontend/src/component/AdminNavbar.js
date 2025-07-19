import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/admincategories", label: "Category" },
     { to: "/admindresses", label: "Add Dress" },
  
    { to: "/admin/all-dresses", label: " Show Dresses" },
    { to: "/admincontact", label: "User Feedback" },
   
  ];

  const handleRoleNavigate = () => {
    navigate("/role"); 
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Dancing+Script&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
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
        <div className="container-fluid px-4">
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
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3 align-items-center">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <Link
                    to={link.to}
                    className="nav-link"
                    style={{
                      color: isActive(link.to) ? "#ff6b6b" : "#4a2c2a",
                      fontWeight: isActive(link.to) ? "bold" : "500",
                      fontFamily: "'Playfair Display', serif",
                      transition: "0.3s",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="nav-item">
                <button
                  onClick={handleRoleNavigate}
                  className="btn btn-link nav-link"
                  style={{
                    cursor: "pointer",
                    color: "#4a2c2a",
                    fontWeight: "500",
                    fontFamily: "'Playfair Display', serif",
                    textDecoration: "none",
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
