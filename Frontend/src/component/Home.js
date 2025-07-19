


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";


function HomePage() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [showMaleShapes, setShowMaleShapes] = useState(false);
  const [showFemaleShapes, setShowFemaleShapes] = useState(false);

  const styles = {
    page: {
      background: "linear-gradient(135deg, #ffe7d1 0%, #e6c1a8 100%)",
      fontFamily: "'Poppins', sans-serif",
    },
    hero: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "40px",
      flexWrap: "wrap",
      gap: "40px",
    },
    left: {
      flex: 1,
      minWidth: "300px",
      animation: "fadeInLeft 1s ease forwards",
      opacity: 0,
    },
    heading: {
      fontSize: "60px",
      fontWeight: "700",
      color: "#4a2c2a",
      marginBottom: "20px",
      lineHeight: "1.2",
    },
    highlight: {
      color: "#ff6b6b",
    },
    text: {
      fontSize: "20px",
      color: "#5f4339",
      marginBottom: "30px",
    },
    image: {
      width: "100%",
      maxWidth: "600px",
      borderRadius: "20px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.3s ease",
      animation: "fadeInRight 1s ease forwards",
      opacity: 0,
    },
    button: {
      padding: "14px 28px",
      backgroundColor: "#ff6b6b",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      color: "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    section: {
      padding: "10px 80px",
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: "36px",
      fontWeight: "600",
      marginBottom: "40px",
      color: "#4a2c2a",
    },
    sectionText: {
      fontSize: "18px",
      color: "#5f4339",
      maxWidth: "800px",
      margin: "0 auto",
    },
    cardsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
      marginTop: "20px",

    },
    card: {
      width: "280px",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "16px",
      padding: "20px",

      boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
      textAlign: "left",
      transition: "transform 0.3s ease",
    },
    icon: {
      width: "200px",
      height: "200px",
      margin: "0 auto 15px",
      borderRadius: "8px",
      objectFit: "cover",
      display: "block",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#4a2c2a",
    },
    cardText: {
      fontSize: "15px",
      color: "#5f4339",
      marginTop: "8px",
    },
    keyframes: `
      @keyframes fadeInLeft {
        from { opacity: 0; transform: translateX(-40px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes fadeInRight {
        from { opacity: 0; transform: translateX(40px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerText = styles.keyframes;
    document.head.appendChild(style);
  }, []);

  const gotobodyshapecalculator = () => navigate("/bodyshapecalculator");

  return (
    <>
      <Navbar />
      <div style={styles.page}>

        <div style={styles.hero}>
          <div style={styles.left}>
            <h1 style={styles.heading}>Know Your <span style={styles.highlight}>Body Shape</span></h1>
            <p style={styles.text}>Find your perfect fit. Discover clothing styles designed to suit your unique body shape and height, personalized just for you.</p>

            <button
              onClick={gotobodyshapecalculator}
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Start Styling →
            </button>
          </div>
          <img
            src="/bodyshape.jpg"
            alt="Body Types"
            style={styles.image}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>


        <div style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: "2px" }}>
            <img src="/assets/image.png" alt="Magic Styling" style={{ height: "100px" }} />
          </div>
          <p style={{ textAlign: "center", color: "#aa6c5c", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
            Simple • Smart • Styled Just for You
          </p>
          <h2 style={styles.sectionTitle}>
            <span style={{ borderBottom: "3px solid #ff6b6b", paddingBottom: "6px" }}>How It Works</span>
          </h2>



          <p style={styles.sectionText}>From measurements to magic — here's how Fit & Flair transforms your wardrobe journey into a personalized styling experience.</p>
          <div style={styles.cardsWrapper}>
            <div style={styles.card}>
              <img src="/assets/measure.jpg" alt="Measure" style={styles.icon} />
              <div style={styles.cardTitle}>Enter Measurements</div>
              <div style={styles.cardText}>Provide your key body metrics — shoulder, bust/chest, waist, and height.</div>
            </div>
            <div style={styles.card}>
              <img src="/assets/ai.jpg" alt="AI" style={styles.icon} />
              <div style={styles.cardTitle}>AI Analysis</div>
              <div style={styles.cardText}>Our algorithm identifies your body shape and height category using advanced AI.</div>
            </div>
            <div style={styles.card}>
              <img src="/assets/recommendation.jpg" alt="Tips" style={styles.icon} />
              <div style={styles.cardTitle}>Style Suggestions</div>
              <div style={styles.cardText}>You receive curated dress recommendations to fit your shape perfectly.</div>
            </div>
          </div>
        </div>


        <div style={styles.section}>
          <h2 style={{
            ...styles.heading, fontSize: "32px",
            marginTop: "60px",
          }}>
            Understanding <span style={styles.highlight}>Body Shape</span>
          </h2>
          <p style={styles.sectionText}>Each body is unique — and that’s what makes it beautiful. Understanding your body shape helps you embrace it and dress with confidence. Male shapes tend to be straighter and broader, while female shapes feature more curves and variation.</p>

          <div style={{ marginTop: '30px' }}>
            <select
              onChange={(e) => {
                setShowMaleShapes(e.target.value === "male");
                setShowFemaleShapes(e.target.value === "female");
              }}
              defaultValue=""
              style={{
                backgroundColor: "#f7f7f7",
                color: "#333",
                padding: "10px 16px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                cursor: "pointer",
                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='16' viewBox='0 0 24 24' width='16' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "16px",
                transition: "all 0.2s ease-in-out",
                minWidth: "220px"
              }}

            >
              <option value="">Select Body Shape Type</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {showMaleShapes && (
            <div style={styles.cardsWrapper}>
              {[
                {
                  title: "Rectangle",
                  desc: "Uniform shoulder, waist, and hips. Opt for layers and structure.",
                  img: "/assets/shapes/recmale.jpg"
                },
                {
                  title: "Triangle",
                  desc: "Wider hips than shoulders. Use shoulder pads and darker bottoms.",
                  img: "/assets/shapes/trimale.jpg"
                },
                {
                  title: "Inverted Triangle",
                  desc: "Broad shoulders and narrow hips. Focus on lower body volume.",
                  img: "/assets/shapes/intrimalejpg.jpg"
                },
                {
                  title: "Oval",
                  desc: "Full midsection. Choose V-necks and structured outerwear.",
                  img: "/assets/shapes/ovalmale.jpg"
                },

                {
                  title: "Trapezoid",
                  desc: "Balanced and athletic. Almost all styles suit this shape.",
                  img: "/assets/shapes/trapmale.jpg"
                }
              ].map((shape, idx) => (
                <div style={styles.card} key={idx}>
                  <img src={shape.img} alt={shape.title} style={styles.icon} />
                  <div style={styles.cardTitle}>{shape.title}</div>
                  <div style={styles.cardText}>{shape.desc}</div>
                </div>
              ))}
            </div>
          )}

          {showFemaleShapes && (
            <div style={styles.cardsWrapper}>
              {[
                {
                  title: "Pear",
                  desc: "Wider hips than bust. Highlight shoulders with ruffles.",
                  img: "/assets/shapes/pearfemale.jpg"
                },
                {
                  title: "Hourglass",
                  desc: "Balanced bust and hips with a defined waist. Use fitted styles.",
                  img: "/assets/shapes/hourfemale.jpg"
                },
                {
                  title: "Rectangle",
                  desc: "Minimal curves. Add volume with flared dresses and belts.",
                  img: "/assets/shapes/recfemale.jpg"
                },
                {
                  title: "Apple",
                  desc: "Fuller midsection. V-necks and flowy tops flatter.",
                  img: "/assets/shapes/applefemale.jpg"
                },
                {
                  title: "Diamond",
                  desc: "Wider midsection and narrow shoulders. Accentuate neckline.",
                  img: "/assets/shapes/diamondfemale.png"
                },
                {
                  title: "Inverted Triangle",
                  desc: "Broader shoulders and narrow hips. Choose A-line skirts.",
                  img: "/assets/shapes/intrifemale.jpg"
                }
              ].map((shape, idx) => (
                <div style={styles.card} key={idx}>
                  <img src={shape.img} alt={shape.title} style={styles.icon} />
                  <div style={styles.cardTitle}>{shape.title}</div>
                  <div style={styles.cardText}>{shape.desc}</div>
                </div>
              ))}
            </div>
          )}


        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;