

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { toast, ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";

const SlideIn = cssTransition({
  enter: "slideInRight",
  exit: "slideOutRight",
  duration: [300, 300],
});

const Admindresspage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    imageFile: null,
    gender: "",
    bodyShape: "",
    category: "",
    heightRange: "",
  });

  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [bodyShapes, setBodyShapes] = useState([]);
  const [heightRanges, setHeightRanges] = useState([]);
  const [loading, setLoading] = useState(id ? true : false);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchCategories();
      await fetchHeightRanges();
      if (form.gender) await fetchBodyShapes(form.gender);
      if (id) {
        await fetchDressById();
      }
    };
    fetchAll();
  }, [id]);

  useEffect(() => {
    if (form.gender) {
      fetchBodyShapes(form.gender);
    } else {
      setBodyShapes([]);
    }
  }, [form.gender]);

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/admin/get/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchHeightRanges = async () => {
    try {
      const res = await axiosInstance.get("/admin/get/heightranges");
      setHeightRanges(res.data.heightRanges || []);
    } catch (err) {
      console.error("Error fetching height ranges", err);
    }
  };

  const fetchBodyShapes = async (gender) => {
    if (!gender) return setBodyShapes([]);
    try {
      const res = await axiosInstance.get(`/admin/get/bodyshapes/${gender}`);
      setBodyShapes(res.data.bodyShapes || []);
    } catch (err) {
      console.error("Error fetching body shapes", err);
    }
  };

  const fetchDressById = async () => {
    try {
      const res = await axiosInstance.get(`/admin/get/dress/${id}`);
      const { dress } = res.data;
      await fetchBodyShapes(dress.gender);

      setForm({
        title: dress.title || "",
        description: dress.description || "",
        imageFile: null,
        gender: dress.gender || "",
        bodyShape: dress.bodyShape || "",
        category: dress.category || "",
        heightRange: dress.heightRange || "",
      });

      if (dress.image) {
        setPreview(`https://fit-and-flair.onrender.com/${dress.image}`);
      }
    } catch (error) {
      console.error("Error fetching dress:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("gender", form.gender);
    formData.append("bodyShape", form.bodyShape);
    formData.append("category", form.category);
    formData.append("heightRange", form.heightRange);
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      if (id) {
        await axiosInstance.put(`/admin/update/dress/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("✔ Dress updated successfully", {
          position: "bottom-right",
          transition: SlideIn,
          autoClose: 2000,
          style: { backgroundColor: "#9c5c34", color: "#fff" },
        });
      } else {
        if (!form.imageFile) {
          toast.warning("⚠️ Please select an image", {
            position: "bottom-right",
            style: { backgroundColor: "#d35400", color: "#fff" },
            transition: SlideIn,
          });
          return;
        }
        await axiosInstance.post("/admin/create/dress", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✔ Dress created successfully", {
          position: "bottom-right",
          transition: SlideIn,
          autoClose: 2000,
          style: { backgroundColor: "#9c5c34", color: "#fff" },
        });
        setForm({
          title: "",
          description: "",
          imageFile: null,
          gender: "",
          bodyShape: "",
          category: "",
          heightRange: "",
        });
        setPreview(null);
      }

      setTimeout(() => navigate("/admin/all-dresses"), 1500);
    } catch (err) {
      toast.error("❌ Error saving dress", {
        position: "bottom-right",
        transition: SlideIn,
        autoClose: 2000,
        style: { backgroundColor: "#a22", color: "#fff" },
      });
    }
  };

  const styles = {
    page: {
      padding: "40px 20px",
      fontFamily: "Segoe UI, sans-serif",
      background: "linear-gradient(to right, #ffe7d1, #e6c1a8)",
      minHeight: "100vh",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#5a320f",
      marginBottom: "30px",
    },
    container: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: 800,
      margin: "auto",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    leftImage: {
      flex: "1 1 40%",
      minHeight: 300,
      background: "#e6c1a8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    rightForm: {
      flex: "1 1 60%",
      padding: "30px",
      display: "grid",
      gap: 15,
    },
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#9c5c34",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    backBtn: {
      display: "block",
      margin: "20px auto 0",
      backgroundColor: "#5a320f",
      color: "#fff",
      padding: "8px 16px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <>
      <AdminNavbar />
      <div style={styles.page}>
        <ToastContainer />
        <h2 style={styles.heading}>{id ? "Edit Dress" : "Add New Dress"}</h2>

        <style>
          {`
    .responsive-dress-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px 0 0 12px;
    }

    @media (max-width: 768px) {
      .responsive-dress-image {
        height: 350px;
        object-fit: cover;
        object-position: center;
        border-radius: 12px 12px 0 0;
      }
    }
  `}
          {`
            @media (max-width: 768px) {
              .responsive-container {
                flex-direction: column !important;
              }
              .responsive-left,
              .responsive-right {
                flex: 1 1 100% !important;
              }
            }
          `}
        </style>

        {loading ? (
          <p style={{ textAlign: "center", color: "#5a320f" }}>Loading dress data...</p>
        ) : (
          <div className="responsive-container" style={styles.container}>
            <div className="responsive-left" style={styles.leftImage}>
             <img
  src={"/assets/managedress.jpg"}
  alt="Style Preview"
  className="responsive-dress-image"
/>

            </div>
            <form className="responsive-right" onSubmit={handleSubmit} style={styles.rightForm}>
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                style={styles.input}
              />
              <textarea
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                style={styles.input}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setForm({ ...form, imageFile: file });
                  if (file) setPreview(URL.createObjectURL(file));
                }}
                style={styles.input}
              />
              <select
                value={form.gender}
                onChange={async (e) => {
                  const selected = e.target.value;
                  await fetchBodyShapes(selected);
                  setForm({ ...form, gender: selected, bodyShape: "" });
                }}
                required
                style={styles.input}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <select
                value={form.bodyShape}
                onChange={(e) => setForm({ ...form, bodyShape: e.target.value })}
                required
                style={styles.input}
              >
                <option value="">Select Body Shape</option>
                {bodyShapes.map((shape) => (
                  <option key={shape} value={shape}>
                    {shape}
                  </option>
                ))}
              </select>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                style={styles.input}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <select
                value={form.heightRange}
                onChange={(e) => setForm({ ...form, heightRange: e.target.value })}
                required
                style={styles.input}
              >
                <option value="">Select Height Range</option>
                {heightRanges.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <button type="submit" style={styles.button}>
                {id ? "Update Dress" : "Add Dress"}
              </button>
            </form>
          </div>
        )}

        <button style={styles.backBtn} onClick={() => navigate("/admin/all-dresses")}>
          ← Back to All Dresses
        </button>
      </div>
    </>
  );
};

export default Admindresspage;

