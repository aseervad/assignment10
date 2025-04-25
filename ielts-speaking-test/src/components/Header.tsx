// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <header style={{
      background: '#2563eb',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h1 style={{ margin: 0 }}>IELTS Speaking Test Platform</h1>
      </div>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>
          Home
        </Link>
        {isAuthenticated ? (
          <Link to="/test-taker-dashboard" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;