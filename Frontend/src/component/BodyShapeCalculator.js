
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const requiredFields = [
  { key: "gender", question: "Please enter your gender (male/female):" },
  { key: "shoulder", question: "Enter your shoulder measurement with unit (e.g., 40 cm):" },
  { key: "chest", question: "Enter your chest measurement with unit (e.g., 90 cm):" },
  { key: "waist", question: "Enter your waist measurement with unit (e.g., 70 cm):" },
  { key: "hip", question: "Enter your hip measurement with unit (e.g., 95 cm):" },
  { key: "height", question: "Enter your height with unit (e.g., 170 cm):" },
];

function parseValueUnit(input) {
  const parts = input.trim().split(" ");
  if (parts.length !== 2) return null;
  const value = parseFloat(parts[0]);
  const unit = parts[1].toLowerCase();
  if (isNaN(value)) return null;
  if (!["cm", "inches", "feet"].includes(unit)) return null;
  return { value, unit };
}

export default function BodyShapeApp() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Welcome! Let's calculate your body shape. " + requiredFields[0].question, fromUser: false },
  ]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState("chat");
  const [chosenStyle, setChosenStyle] = useState("");
  const [result, setResult] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (currentPage === "recommendations" && chosenStyle && result) {
      fetchRecommendedDresses();
    }
  }, [currentPage, chosenStyle, result]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("User not logged in");
      setTimeout(() => {
        navigate("/signin");
      }, 100);
    }
  }, [navigate]);

  useEffect(() => {
  setTimeout(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end", // 🛑 prevents footer overlap
        inline: "nearest",
      });
    }
  }, 100); // slight delay ensures DOM is ready
}, [chatMessages]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://fit-and-flair.onrender.com/admin/get/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  const fetchRecommendedDresses = async () => {
    try {
      const res = await axios.post("https://fit-and-flair.onrender.com/user/get-dresses-by-fields", {
        gender: formData.gender,
        bodyShape: result.bodyShape,
        heightRange: result.heightCategory,
        category: chosenStyle,
      });
      const dresses = res.data.dresses || [];
      setResult((prev) => ({ ...prev, dressRecommendations: dresses }));
    } catch (err) {
      console.error("Error fetching recommended dresses:", err);
    }
  };

  const addBotMessage = (text) => {
    setChatMessages((msgs) => [...msgs, { id: Date.now(), text, fromUser: false }]);
  };

  const addUserMessage = (text) => {
    setChatMessages((msgs) => [...msgs, { id: Date.now(), text, fromUser: true }]);
  };

  const handleSend = async () => {
    const userInput = input.trim();
    if (!userInput) return;
    addUserMessage(userInput);
    setInput("");
    const currentField = requiredFields[currentFieldIndex];
    if (currentField?.key === "gender") {
      const val = userInput.toLowerCase();
      if (val === "male" || val === "female") {
        setFormData({ ...formData, gender: val });
        nextField(currentFieldIndex + 1);
      } else {
        addBotMessage("Invalid gender. Please type 'male' or 'female'.");
      }
    } else if (currentField) {
      const parsed = parseValueUnit(userInput);
      if (parsed) {
        const newFormData = { ...formData, [currentField.key]: parsed };
        setFormData(newFormData);
        const nextIndex = currentFieldIndex + 1;
        if (nextIndex < requiredFields.length) {
          nextField(nextIndex);
        } else {
          try {
            const token = sessionStorage.getItem("token");
            if (!token) {
              alert("Please sign in first!");
              navigate("/signin");
              return;
            }
            const res = await axios.post("https://fit-and-flair.onrender.com/body/body-shapes", newFormData, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setResult(res.data);
            setCurrentPage("result");
          } catch (error) {
            console.error("API error:", error);
            addBotMessage("Error calculating body shape. Please try again.");
          }
        }
      } else {
        addBotMessage("Invalid format. Use number and unit (cm, inches, feet). Ex: 40 cm");
      }
    }
  };

  const nextField = (index) => {
    addBotMessage(requiredFields[index].question);
    setCurrentFieldIndex(index);
  };

  const restart = () => {
    setCurrentPage("chat");
    setChatMessages([{ id: 1, text: "Welcome! Let's calculate your body shape. " + requiredFields[0].question, fromUser: false }]);
    setCurrentFieldIndex(0);
    setFormData({});
    setInput("");
    setChosenStyle("");
    setResult(null);
  };

  const styleOptions = categories.map((cat) => cat.categoryName);

  if (currentPage === "chat") {
    return (
      <>
        <Navbar />
        <div style={styles.chatPage}>
          <div style={styles.chatContainer}>
            <div style={styles.chatMessages}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    ...styles.chatMessage,
                    alignSelf: msg.fromUser ? "flex-end" : "flex-start",
                    backgroundColor: msg.fromUser ? "#9c5c34" : "#ffcba4",
                    color: msg.fromUser ? "#fff" : "#5D432C",
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={styles.chatInputRow}>
              <input
                type="text"
                placeholder="Type your answer..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                style={styles.chatInput}
              />
              <button onClick={handleSend} style={styles.chatSendButton}>Send</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (currentPage === "result") {
    return (
      <>
        <Navbar />
        <div style={styles.fullPageBackground}>
          <div style={{ padding: "30px 20px", maxWidth: 900, margin: "0 auto" }}>
            <h2 style={styles.heading}>Your Body Shape Summary</h2>
            <ul style={styles.resultList}>
              <li><strong>Gender:</strong> {formData.gender || "Not available"}</li>
              <li><strong>Height:</strong> {formData.height?.value + " " + formData.height?.unit || "Not available"}</li>
              <li><strong>Height Category:</strong> {result?.heightCategory || "Not available"}</li>
              <li><strong>Body Shape:</strong> {result?.bodyShape || "Not available"}</li>
            </ul>

            <h3 style={{ ...styles.heading, marginTop: 30 }}>Choose a Style to Get Recommendations</h3>
            <div style={styles.buttonRow}>
              {styleOptions.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setChosenStyle(style);
                    setCurrentPage("recommendations");
                  }}
                  style={styles.styleButton}
                >
                  {style}
                </button>
              ))}
            </div>

            <button onClick={restart} style={{ ...styles.restartButton, marginTop: 30 }}>Restart Calculator</button>
          </div>
        </div>
      </>
    );
  }
if (currentPage === "recommendations") {
  return (
    <>
      <Navbar />
      <div style={styles.fullPageBackground}>
        <div style={styles.recommendationContent}>
          
          <div style={styles.recommendationHeader}>
  <h2 style={styles.heading}>
    Recommendations for {chosenStyle} style
  </h2>
  <div style={styles.topButtons}>
    <button
      style={styles.backButton}
      onClick={() => setCurrentPage("result")}
    >
      Back to Style Selection
    </button>
    <button
      style={styles.restartButton}
      onClick={restart}
    >
      Restart Calculator
    </button>
  </div>
</div>


         {result?.dressRecommendations?.length > 0 ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      alignItems: "center",
      marginTop: "30px",
    }}
  >
    {result.dressRecommendations.map((dress) => (
      <div
  key={dress._id}
  style={{
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "center" : "flex-start",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    gap: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    maxWidth: "600px",
    width: "100%",
    textAlign: isMobile ? "center" : "left",
  }}
>

       <img
  src={`https://fit-and-flair.onrender.com/${dress.image}`}
  alt={dress.title}
  style={{
    width: isMobile ? "100%" : "220px",
    height: "auto",
    objectFit: "cover",
    borderRadius: "12px",
    backgroundColor: "#f3f3f3",
  }}
/>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              color: "#9c5c34",
              fontWeight: "bold",
              marginBottom: "10px",
              textTransform: "capitalize",
            }}
          >
            {dress.title}
          </h3>
          <p style={{ fontSize: "15px", color: "#333", lineHeight: 1.6 }}>
            {dress.description}
          </p>
        </div>
      </div>
    ))}
  </div>
) : (
  <p>No dresses found for this style.</p>
)}


        </div>
      </div>
    </>
  );
}

}

const styles = {
  chatPage: {
    background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
    minHeight: "100vh",
    paddingTop: "40px",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  chatContainer: {
    width: "100%",
    maxWidth: "600px",
    height: "70vh",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  chatMessages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    fontSize: "15px",
    display: "flex",
    flexDirection: "column",
  },
  chatMessage: {
    padding: "10px 15px",
    margin: "8px 0",
    borderRadius: "18px",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  chatInputRow: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: "10px",
    flexWrap: "wrap",
    gap: "10px",
  },
  chatInput: {
    flex: 1,
    borderRadius: "20px",
    border: "1px solid #ccc",
    padding: "10px 15px",
    fontSize: "16px",
    minWidth: "0",
  },
  chatSendButton: {
    padding: "10px 20px",
    backgroundColor: "#9c5c34",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  fullPageBackground: {
  minHeight: "100vh",
  width: "100vw",            // ✔️ Full viewport width
  background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
  paddingTop: 60,
  paddingBottom: 100,
  paddingLeft: "10px",
  paddingRight: "10px",
  margin: "0",                // ✔️ Remove default margins
  boxSizing: "border-box",    // ✔️ Include padding in width
  overflowX: "hidden",        // ✔️ Hide unwanted scroll
},

  recommendationContent: {
    padding: "0 20px",
    marginBottom: "60px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  heading: {
    color: "#5D432C",
    marginBottom: "20px",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 600,
  },
  resultList: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    fontSize: "15px",
    lineHeight: "1.6",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    listStyle: "none",
    wordWrap: "break-word",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  styleButton: {
    padding: "10px 16px",
    backgroundColor: "#9c5c34",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  recommendationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "30px",
    paddingTop: "10px",
    gap: "10px",
  },
  topButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  backButton: {
    padding: "8px 14px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  restartButton: {
    padding: "8px 14px",
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  cardContainer: {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  alignItems: "center",
  marginTop: "30px",
},

  
}

