import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer'

const DressGroupPage = () => {
  const { groupKey } = useParams();
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);

  useEffect(() => {
    fetchDresses();
  }, []);

  const fetchDresses = async () => {
    try {
      const res = await axiosInstance.get("/admin/get/dresses");
      const allGroups = res.data.dresses || [];
      const [gender, category, bodyShape, heightRange] = groupKey.split("_");

      const groupMatch = allGroups.find(
        (group) =>
          group.gender === gender &&
          group.category === category &&
          group.bodyShape === bodyShape &&
          group.heightRange === heightRange
      );

      setDresses(groupMatch?.dresses || []);
    } catch (err) {
      console.error("Error fetching group dresses", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/delete/dress/${id}`);
      setDresses((prev) => prev.filter((d) => d._id !== id));
      toast.success("✔ Dress deleted");
    } catch (err) {
      toast.error("❌ Failed to delete dress");
      console.error("Delete error", err);
    }
  };

  return <>
    <div
      style={{
        padding: "40px 20px",
        background: "linear-gradient(to right, #ffe7d1, #e6c1a8)",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#5a320f",
          marginBottom: "30px",
        }}
      >
        Group Dresses
      </h2>

      <button
        onClick={() => navigate("/admin/all-dresses")}
        style={{
          margin: "30px auto",
          display: "block",
          background: "#9c5c34",
          color: "#fff",
          padding: "8px 16px",
          border: "none",
          borderRadius: 8,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Back to All Dresses
      </button>

      {/* Wrapper to show dresses side by side */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {dresses.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No dresses found in this group.
          </p>
        ) : (
          dresses.map((dress) => (
            <div
              key={dress._id}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                background: "rgba(255, 255, 255, 0.5)",
                borderRadius: 12,
                padding: 20,
                gap: 20,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                width: "650px",
              }}
            >
              <img
                src={`https://fit-and-flair.onrender.com/${dress.image}`}
                alt={dress.title}
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 12,
                  backgroundColor: "#f3f3f3",
                }}
              />

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: 20,
                      color: "#9c5c34",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    {dress.title}
                  </h4>
                  <p style={{ fontSize: 14, color: "#333", margin: "10px 0" }}>
                    {dress.description}
                  </p>
                </div>

                <div
  style={{
    display: "flex",
    gap: "20px",
    overflowX: "auto", // enables horizontal scroll
    padding: "10px 0",
  }}
>

                  <button
                    onClick={() => handleDelete(dress._id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      background: "#a22",
                      color: "#fff",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/admin/edit-dress/${dress._id}`)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: 6,
                      border: "none",
                      cursor: "pointer",
                      background: "#107279",
                      color: "#fff",
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
  </>
};

export default DressGroupPage;
