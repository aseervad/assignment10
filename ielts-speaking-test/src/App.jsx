import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Navbar from './components/layout/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import SpeakingTests from './components/tests/SpeakingTests';
import ListeningTests from './components/tests/ListeningTests';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100"> {/* Added flex utilities */}
        <Navbar />
        <div className="container mt-4 flex-grow-1"> {/* Added flex-grow-1 */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/speaking-tests" element={<SpeakingTests />} />
            <Route path="/listening-tests" element={<ListeningTests />} />
          </Routes>
        </div>
        <Footer /> {/* Add the Footer component */}
      </div>
    </Router>
  );
}

export default App;