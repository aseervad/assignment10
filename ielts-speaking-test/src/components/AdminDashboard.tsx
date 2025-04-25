// src/components/AdminDashboard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. This is a protected route.</p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Admin Controls</h2>
        <ul>
          <li>Manage test questions</li>
          <li>View test taker results</li>
          <li>Configure test settings</li>
        </ul>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Link 
          to="/" 
          style={{
            color: '#2563eb',
            marginRight: '1rem'
          }}
        >
          Back to Home
        </Link>
        <button 
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.reload();
          }}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;