import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TestTakerDashboard from './components/TestTakerDashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  // In a real app, this would come from your authentication system
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <BrowserRouter>
      <div style={{
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/test-taker-dashboard" element={<TestTakerDashboard />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;