import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to IELTS Practice</h1>
      <p className="lead">Practice your English language skills and prepare for your IELTS test</p>
      <hr className="my-4" />
      <p>Choose a test type to begin practicing:</p>
      <div className="d-flex">
        <Link to="/speaking-tests" className="btn btn-primary btn-lg me-2">Speaking Tests</Link>
        <Link to="/listening-tests" className="btn btn-success btn-lg">Listening Tests</Link>
      </div>
    </div>
  );
};

export default Home;