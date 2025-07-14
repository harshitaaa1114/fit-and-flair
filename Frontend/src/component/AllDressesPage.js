

import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";
import Footer from './Footer'

const AllDressesPage = () => {
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);
  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    fetchDresses();
  }, []);

  const fetchDresses = async () => {
    try {
      const res = await axiosInstance.get("/admin/get/dresses");
      setDresses(res.data.dresses || []);
    } catch (err) {
      console.error("Error fetching dresses", err);
    }
  };

  const handleDeleteGroup = async (groupKey) => {
    const [gender, category, bodyShape, heightRange] = groupKey.split("_");

    const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.post("/admin/delete/group", {
        gender,
        category,
        bodyShape,
        heightRange,
      });

      toast.success("✔ Group deleted successfully", {
        position: "bottom-right",
        style: { backgroundColor: "#a22", color: "#fff" },
      });

      fetchDresses(); // Refresh the list
    } catch (err) {
      console.error("Error deleting group:", err);
      toast.error("❌ Failed to delete group", {
        position: "bottom-right",
        style: { backgroundColor: "#d35400", color: "#fff" },
      });
    }
  };

  const grouped = dresses.reduce((acc, item) => {
    const key = `${item.gender}_${item.category}_${item.bodyShape}_${item.heightRange}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const styles = {
    page: {
      padding: "40px 20px",
      background: "linear-gradient(to right, #ffe7d1, #e6c1a8)",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },
    groupBox: {
      margin: "30px auto",
      maxWidth: 1000,
      background: "rgba(255, 255, 255, 0.5)",
      borderRadius: 12,
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      padding: 20,
    },
    groupHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },
    groupTitle: {
      fontWeight: "bold",
      color: "#5a320f",
      flex: "1 1 auto",
      minWidth: "200px",
    },
    btnGroup: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    showBtn: {
      background: "#9c5c34",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "6px 14px",
      cursor: "pointer",
    },
    deleteBtn: {
      background: "#a22",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "6px 14px",
      cursor: "pointer",
    },
    dressCard: {
      display: "flex",
      gap: 20,
      padding: 10,
      marginBottom: 10,
      borderBottom: "1px solid #eee",
      alignItems: "center",
      flexWrap: "wrap",
    },
    dressImage: {
      width: 100,
      height: 100,
      objectFit: "cover",
      borderRadius: 8,
      backgroundColor: "#f0f0f0",
    },
    dressInfo: {
      color: "#333",
      flex: "1 1 auto",
      minWidth: "200px",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#5a320f",
      marginBottom: "30px",
    },
  };

  return (
    <>
      <AdminNavbar />
      <div style={styles.page}>
        <ToastContainer />
        <h2 style={styles.heading}>All Dresses</h2>

        {Object.entries(grouped).map(([groupKey, groupDresses]) => (
          <div key={groupKey} style={styles.groupBox}>
            <div style={styles.groupHeader}>
              <p style={styles.groupTitle}>Group: {groupKey.replaceAll("_", ", ")}</p>
              <div style={styles.btnGroup}>
                <button style={styles.showBtn} onClick={() => navigate(`/admin/group/${groupKey}`)}>
                  Show More
                </button>
                <button style={styles.deleteBtn} onClick={() => handleDeleteGroup(groupKey)}>
                  Delete Group
                </button>
              </div>
            </div>

            {expandedGroup === groupKey && (
              <div style={{ marginTop: 20 }}>
                {groupDresses.map((dress) => (
                  <div key={dress._id} style={styles.dressCard}>
                    <img
                      src={`https://fit-and-flair.onrender.com/${dress.image}`}
                      alt={dress.title}
                      style={styles.dressImage}
                    />
                    <div style={styles.dressInfo}>
                      <h5 style={{ color: "#9c5c34" }}>{dress.title}</h5>
                      <p style={{ fontSize: 14 }}>{dress.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Responsive media styles */}
      <style>
        {`
          @media (max-width: 600px) {
            .groupTitle {
              font-size: 14px;
            }

            .btnGroup {
              flex-direction: column;
              width: 100%;
              align-items: flex-start;
            }

            .dressCard {
              flex-direction: column;
              align-items: flex-start;
            }

            .dressImage {
              width: 100%;
              height: auto;
            }

            .dressInfo {
              width: 100%;
            }
          }
        `}
      </style>
      <Footer/>
    </>
  );
};

export default AllDressesPage;
