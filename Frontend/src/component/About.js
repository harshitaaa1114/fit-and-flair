

import React, { useEffect } from "react";
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  return <>
    <Navbar />
    <div style={styles.wrapper}>
      <div className="topRow" style={styles.topRow}>

        <div className="sideNav" style={styles.sideNav}>
          {sectionsData.map((s, i) => (
            <a key={i} href={`#section-${i}`} className="navLink" style={styles.navLink}>
              {s.title}
            </a>
          ))}
        </div>

        <div className="fade-in-section" style={styles.headerSection}>
          <h1 className="mainHeading" style={styles.mainHeading}>
            About <span style={styles.highlight}>Fit & Flair</span>
          </h1>
          <p className="subtext" style={styles.subtext}>
            Fit & Flair isn’t just about fashion — it’s about you. We blend the precision of technology with the elegance of style to craft personalized outfit experiences based on your authentic body shape and height.
            <br />Our platform goes beyond trends and templates — it listens to your body. We believe that fashion should fit you, not the other way around. Whether you're curvy, lean, tall, petite, or anywhere in between, we decode your measurements and transform them into outfits that enhance confidence and self-expression.
            <br />At Fit & Flair, individuality isn’t just respected — it’s celebrated. Using smart algorithms, a body-positive mindset,
            and a touch of creative flair, we deliver styling suggestions that are made just for you.
          </p>
        </div>
      </div>

      {sectionsData.map(({ title, content, image }, index) => (
        <div
          id={`section-${index}`}
          key={index}
          className="fade-in-section section"
          style={{
            ...styles.section,
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          }}
        >
          <div className="imageContainer" style={styles.imageContainer}>
            <img src={image} alt={title} style={styles.image} />
          </div>
          <div className="textContainer" style={styles.textContainer}>
            <h2 style={styles.sectionHeading}>{title}</h2>
            <p style={styles.sectionText}>{content}</p>
          </div>
        </div>
      ))}

      <style>{`
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
  }

  .fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .fade-in-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  a:hover {
    color: #ff6b6b;
    transform: translateX(5px);
    transition: all 0.3s ease;
  }

  @media (max-width: 992px) {
    .topRow {
      flex-direction: column !important;
      align-items: center;
    }

    .sideNav {
      flex-direction: row !important;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
    }

    .navLink {
      margin: 5px 10px !important;
      font-size: 16px;
    }

    .mainHeading {
      font-size: 36px !important;
      text-align: center;
    }

    .subtext {
      font-size: 16px;
      text-align: center;
    }

    .section {
      flex-direction: column !important;
      text-align: center;
    }

    .imageContainer img {
      height: 250px !important;
    }
  }

  @media (max-width: 600px) {
    .mainHeading {
      font-size: 28px !important;
    }

    .subtext {
      font-size: 14px !important;
    }

    .imageContainer img {
      height: 200px !important;
    }

    .navLink {
      margin: 5px 8px !important;
      font-size: 14px;
    }
  }
`}</style>


    </div>
    <Footer/>
  </>
};


const sectionsData = [
  {
    title: "The Problem",
    content:
      "Most people struggle to find clothes that truly suit their body type. With generic sizing and styling advice, confidence takes a hit. Our mission begins by solving this root issue.",
    image: "/assets/problem2.jpg",
  },
  {
    title: "Our Solution",
    content:
      "We analyze simple body metrics like shoulder width, waist, hip, and height. Using AI, we match your shape to the best dress styles — making style feel easy, visual, and reliable.",
    image: "/assets/oursolution_.jpg",
  },
  {
    title: "Why Fit and Flair?",
    content:
      "Because no two bodies are the same. Fit & Flair believes in celebrating what makes you unique. You get suggestions made *for you* — not based on arbitrary fashion norms.",
    image: "/assets/fit.png",
  },
  {
    title: "Our Purpose",
    content:
      "To eliminate guesswork. We empower individuals to dress confidently by offering tools that understand shape, style, and comfort. No confusion. Just clarity.",
    image: "/assets/purpose.jpg",
  },
  {
    title: "What We Do",
    content:
      "We provide a styling assistant that delivers customized suggestions for dresses across traditional, western, formal, and casual wear. Visual examples make it easier to decide what suits you best.",
    image: "/assets/whatwedo2.jpg",
  },
  {
    title: "Our Technology",
    content:
      "We use modern web tech and AI algorithms to identify body shapes accurately and map them to curated fashion data. Every suggestion is backed by visual learning.",
    image: "/assets/ourtech.jpg",
  },
  {
    title: "Confidence Starts with Fit",
    content:
      "Wearing something that truly fits your form elevates how you feel. That’s why we start with fit. When you look right, you feel right — and that confidence shows.",
    image: "/assets/confidence.jpg",
  },
  {
    title: "Your Experience",
    content:
      "From onboarding to outfit suggestions, we guide you in a smooth, joyful process. The UI is clean, results are visual, and interaction feels like working with a real stylist.",
    image: "/assets/experience.jpg",
  },
];


const styles = {
  wrapper: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #fceade 0%, #eacdbd 100%)",
    fontFamily: "'Playfair Display', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "60px",
    flexWrap: "wrap",
  },
  sideNav: {
    flex: "0 0 220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingRight: "20px",
    marginTop: "20px",
  },
  navLink: {
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "14px",
    color: "#4a2c2a",
    textDecoration: "underline",
    cursor: "pointer",
  },
  headerSection: {
    flex: 1,
    maxWidth: "900px",
  },
  mainHeading: {
    fontSize: "54px",
    fontWeight: "700",
    color: "#4a2c2a",
    marginBottom: "20px",
  },
  highlight: {
    color: "#ff6b6b",
  },
  subtext: {
    fontSize: "20px",
    lineHeight: "1.6",
    color: "#5f4339",
    maxWidth: "700px",
    margin: "0 auto",
  },
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    marginBottom: "80px",
    flexWrap: "wrap",
    maxWidth: "1000px",
    padding: "0 20px",
  },
  imageContainer: {
    flex: 1,
    maxWidth: "450px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "300px",
    borderRadius: "12px",
    objectFit: "cover",
  },
  textContainer: {
    flex: 1,
    maxWidth: "450px",
  },
  sectionHeading: {
    fontSize: "28px",
    color: "#4a2c2a",
    marginBottom: "14px",
  },
  sectionText: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#5f4339",
  },
};

export default About;
