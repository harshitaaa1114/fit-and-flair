import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={styles.container}
      >
        <h1 style={styles.title}>Fit & Flair</h1>

        <div style={styles.cardContainer}>
          <motion.div
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 20px rgba(255, 107, 107, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={styles.card}
            onClick={() => navigate("/home")}
          >
            <span style={styles.cardText}>USER</span>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 20px rgba(255, 107, 107, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            style={styles.card}
            onClick={() => navigate("/adminsignin")}
          >
            <span style={styles.cardText}>ADMIN</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  container: {
    textAlign: "center",
  },
  title: {
    fontSize: "60px",
    fontWeight: "700",
    color: "#4a2c2a", 
    marginBottom: "40px",
    lineHeight: "1.2",
    letterSpacing: "3px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2.5rem",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    padding: "2rem 3.5rem",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    minWidth: "140px",
    textAlign: "center",
  },
  cardText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#ff6b6b", 
    letterSpacing: "2px",
  },
};

export default RoleSelection;
