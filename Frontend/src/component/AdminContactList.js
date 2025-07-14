import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaUser, FaRegEdit, FaClock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar"; // optional if you have it

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("https://fit-and-flair.onrender.com/form/admin/contacts");
        setMessages(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch contact messages.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <AdminNavbar />
      <ToastContainer />
      <div style={styles.page}>
        <h2 style={styles.heading}>📨 User Contact Messages</h2>
        <div style={styles.container}>
          {messages.length === 0 ? (
            <p style={styles.noMsg}>No messages found.</p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} style={styles.card}>
                <div style={styles.row}>
                  <FaUser style={styles.icon} />
                  <strong>{msg.name}</strong>
                </div>
                <div style={styles.row}>
                  <FaEnvelope style={styles.icon} />
                  <span>{msg.email}</span>
                </div>
                {msg.subject && (
                  <div style={styles.row}>
                    <FaRegEdit style={styles.icon} />
                    <span>{msg.subject}</span>
                  </div>
                )}
                <div style={styles.message}>{msg.message}</div>
                <div style={styles.time}>
                  <FaClock style={{ marginRight: "6px" }} />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(to right, #fff6f1, #fbe2d8)",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#7c4a36",
    textShadow: "1px 1px #fff",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    color: "#5d432c",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderLeft: "5px solid #7c4a36",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
  },
  message: {
    background: "#fef1e8",
    padding: "12px",
    borderRadius: "10px",
    fontStyle: "italic",
    lineHeight: "1.5",
  },
  time: {
    marginTop: "10px",
    fontSize: "13px",
    color: "#a26a4e",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    color: "#7c4a36",
  },
  noMsg: {
    fontSize: "16px",
    textAlign: "center",
    color: "#a26a4e",
  }
};

export default AdminContactMessages;
