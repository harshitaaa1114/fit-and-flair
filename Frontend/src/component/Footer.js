import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#FFD6BA',
      color: '#fff',
      padding: '20px 10px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    footerTop: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      borderBottom: '1px solid #444',
      paddingBottom: '20px',
    },
    footerSection: {
      flex: '1 1 200px',
      margin: '10px',
    },
    heading: {
      color: '#e91e63',
      marginBottom: '10px',
    },
    link: {
      display: 'block',
      color: '#9c5c34',
      textDecoration: 'none',
      marginBottom: '8px',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#fff',
    },
    footerBottom: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#aaa',
      fontSize: '14px',
    },
    comment:{
      color: '#9c5c34'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerTop}>
        <div style={styles.footerSection}>
          <h4 style={styles.heading}>Fit and Flair</h4>
          <p style={styles.comment}>Your style, your confidence.</p>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.heading}>Quick Links</h4>
          <a href="/about" style={styles.link}>About Us</a>
          <a href="/contact" style={styles.link}>Contact</a>
          <a href="/home" style={styles.link}>Home</a>
          <a href="/bodyshapecalculator" style={styles.link}>Test your Shape</a>
        </div>
        <div style={styles.footerSection}>
          <h4 style={styles.heading}>Follow Us</h4>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Facebook</a>
        </div>
      </div>
      <div style={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Fit and Flair. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
