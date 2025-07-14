import React from 'react';
import { useNavigate } from 'react-router-dom';

const FitAndFlair = () => {
  const containerStyle = {
    height: '100vh',
    backgroundColor: '#917B52',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  const titleStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    marginTop: '10px',
  };
   const Navigate = useNavigate();
   const gotorole= ()=>{
    Navigate("/role");
   }
  return <>
    <div style={containerStyle}>
      <div>
        <h1 style={titleStyle}>FIT AND FLAIR</h1>
        <p style={subtitleStyle}>
          Discover your style.<br />Flaunt your shape.
        </p>
        <button onClick = {gotorole
        }className="btn btn-warning fw-bold px-4 py-2 mt-3">
          Get Started
        </button>
      </div>
    </div>
  </>;
};

export default FitAndFlair;



