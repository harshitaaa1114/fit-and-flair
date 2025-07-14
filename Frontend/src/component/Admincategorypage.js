

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../axios";
import AdminNavbar from "./AdminNavbar";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

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
    form: {
      textAlign: "center",
      marginBottom: "30px",
    },
    input: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginRight: "10px",
      width: "250px",
    },
    button: {
      padding: "10px 16px",
      backgroundColor: "#9c5c34",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginRight: "10px",
    },
    deleteAllButton: {
      backgroundColor: "#a22",
    },
    tableContainer: {
      maxWidth: "900px",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#9c5c34",
      color: "#fff",
      padding: "12px",
      textAlign: "left",
      fontSize: "16px",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      fontSize: "15px",
    },
    deleteBtn: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      padding: "6px 12px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/admin/get/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      alert("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!newCategory.trim()) return alert("Enter category name");
    try {
      if (editingId) {
        await axiosInstance.put(`/admin/update/category/${editingId}`, { categoryName: newCategory });
        setEditingId(null);
      } else {
        await axiosInstance.post("/admin/create/category", { categoryName: newCategory });
      }
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      alert("Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/admin/delete/category/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all categories?")) {
      try {
        await axiosInstance.delete("/admin/delete/categories");
        fetchCategories();
      } catch (err) {
        alert("Failed to delete all categories");
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div style={styles.page} className="admin-page">
        <h2 style={styles.heading}>Add New Category</h2>

        <div style={styles.form} className="admin-form">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={styles.input}
          />
          <button style={styles.button} onClick={handleAddOrUpdate}>
            {editingId ? "Update" : "Add"}
          </button>
          <button
            style={{ ...styles.button, ...styles.deleteAllButton }}
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
        </div>

        <motion.div
          style={styles.tableContainer}
          className="table-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table style={styles.table} className="category-table">
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Category Name</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{cat.categoryName}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <style>{`
          @media (max-width: 768px) {
            .admin-form {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
            }

            .admin-form input {
              width: 90% !important;
              margin-right: 0 !important;
            }

            .admin-form button {
              width: 90% !important;
            }

            .table-container {
              overflow-x: auto;
            }

            .category-table th, .category-table td {
              font-size: 14px !important;
              padding: 8px !important;
              text-align: center;
            }

            .category-table button {
              width: 100%;
              padding: 8px;
              font-size: 13px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AdminCategoryPage;

