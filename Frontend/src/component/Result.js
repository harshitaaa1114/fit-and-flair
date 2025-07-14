
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const ResultPage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate(); // 👈 hook to navigate

  const handleViewMore = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    // Navigate to lowercase path like /style/formal
    navigate(`/style/${category.toLowerCase()}`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7e0b2', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '60px 40px', color: '#5D432C' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>Result :</h1>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '24px', color: '#3a2e15' }}>Your Body Shape :</span>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '24px', color: '#3a2e15' }}>Height Category :</span>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <span style={{ fontSize: '24px', color: '#3a2e15' }}>Recommendation :</span>
        </div>

        <button
          onClick={handleViewMore}
          style={{
            padding: '12px 24px',
            backgroundColor: '#9c5c34',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'white',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showCategories ? 'Hide Categories' : 'View More Recommendation'}
        </button>

        {showCategories && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '20px' }}>
            {['Formal', 'Western', 'Traditional', 'Casual', 'Indowestern'].map((category, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryClick(category)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e6c187',
                  color: '#5D432C',
                  border: '1px solid #5D432C',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
