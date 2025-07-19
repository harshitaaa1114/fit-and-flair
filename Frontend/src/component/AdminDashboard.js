
import React from "react";
import { motion } from "framer-motion";
import AdminNavbar from "./AdminNavbar";
import Footer from './Footer'

const cardData = [
  {
    title: "Manage Categories",
    description: "Create, update, or delete fashion categories.",
    path: "/admincategories",
  },
  {
    title: "Manage Dresses",
    description: "Add, view, or modify dress recommendations.",
    path: "/admindresses",
  },
 
];

const AdminDashboard = () => {
  const styles = {
    page: {
      background: "linear-gradient(to right, #ffe7d1, #e6c1a8)",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "Segoe UI, sans-serif",
    },
    heading: {
      textAlign: "center",
      fontSize: "36px",
      color: "#9c5c34",
      marginBottom: "40px",
      fontWeight: "bold",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "25px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      textAlign: "center",
      transition: "transform 0.3s ease",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "22px",
      marginBottom: "10px",
      color: "#9c5c34",
      fontWeight: "600",
    },
    cardDesc: {
      fontSize: "15px",
      color: "#5d432c",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 18px",
      backgroundColor: "#9c5c34",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      cursor: "pointer",
    },
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return <>
  <AdminNavbar/>
    <div style={styles.page}>
      <motion.h1
        style={styles.heading}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Admin Dashboard
      </motion.h1>

      <div style={styles.cardGrid}>
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            style={styles.card}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            onClick={() => handleNavigate(card.path)}
          >
            <div style={styles.cardTitle}>{card.title}</div>
            <div style={styles.cardDesc}>{card.description}</div>
            <button style={styles.button}>Manage</button>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer/>
  </>
};

export default AdminDashboard;
