import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">IELTS Practice</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded={!isNavCollapsed ? true : false} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsNavCollapsed(true)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/speaking-tests" onClick={() => setIsNavCollapsed(true)}>Speaking Tests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listening-tests" onClick={() => setIsNavCollapsed(true)}>Listening Tests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" onClick={() => setIsNavCollapsed(true)}>Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => setIsNavCollapsed(true)}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;