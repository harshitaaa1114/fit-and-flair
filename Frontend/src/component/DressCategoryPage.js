// src/components/DressCategoryPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'

const DressCategoryPage = ({ title, dresses }) => {
  const navigate = useNavigate();

  return <>
    <div style={{ padding: '40px', backgroundColor: '#fdf3dd', minHeight: '100vh' }}>
      <button
        onClick={() => navigate(-1)} // Go back to the previous page (Result Page)
        style={backButtonStyle}
      >
        ← Back
      </button>

      <h2 style={{ color: '#5D432C', marginBottom: '30px', textAlign: 'center' }}>{title}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
        {dresses.map((dress, index) => (
          <div key={index} style={cardStyle}>
            <img src={dress.imageUrl} alt={dress.title} style={imgStyle} />
            <h4>{dress.title}</h4>
            <p>{dress.description}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
  </>
};

const backButtonStyle = {
  backgroundColor: '#5D432C',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginBottom: '20px',
};

const cardStyle = {
  width: '250px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const imgStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '8px',
};

export default DressCategoryPage;
