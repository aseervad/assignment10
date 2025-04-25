// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to IELTS Speaking Test Platform</h1>
      <p>Practice your English speaking skills and prepare for your IELTS exam.</p>
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/login" 
          style={{
            background: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            textDecoration: 'none',
            marginRight: '1rem'
          }}
        >
          Login
        </Link>
        <Link 
          to="/test-taker-dashboard" 
          style={{
            background: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          Go to Dashboard (Protected)
        </Link>
      </div>
    </div>
  );
};

export default Home;