import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpeakingTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api/speaking-tests';

  const fetchTests = async () => {
    try {
      const res = await axios.get(API_URL);
      setTests(res.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load tests. Is the backend running?');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!question.trim()) {
      setError('Question cannot be empty');
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        question: question,
        user_id: 1 // Default user ID for demo
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Add the new test to the top of the list
      setTests([res.data.data, ...tests]);
      setQuestion('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create test');
      console.error('API Error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (testId) => {
    try {
      await axios.delete(`${API_URL}/${testId}`);
      // Remove the deleted test from the list
      setTests(tests.filter(test => test.id !== testId));
    } catch (err) {
      setError('Failed to delete test');
      console.error('Error deleting test:', err);
    }
  };

  if (loading) {
    return <div>Loading speaking tests...</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Speaking Tests</h2>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {error}
          {error.includes('backend') && (
            <div>
              <p>Make sure:</p>
              <ul>
                <li>Your Flask backend is running (check terminal)</li>
                <li>You're using the correct port (usually 5000)</li>
                <li>There are no CORS errors in browser console</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ddd' }}>
        <h3>Add New Question</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '10px 0' }}>
            <textarea
              style={{ width: '100%', minHeight: '100px' }}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your speaking test question here..."
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h3>Test Records</h3>
        {tests.length === 0 ? (
          <p>No tests available</p>
        ) : (
          <div>
            {tests.map(test => (
              <div key={test.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #eee' }}>
                <h4>{test.question}</h4>
                {test.response && <p><strong>Response:</strong> {test.response}</p>}
                {test.score && <p><strong>Score:</strong> {test.score}</p>}
                <p><small>Created: {new Date(test.created_at).toLocaleString()}</small></p>
                <button 
                  onClick={() => handleDelete(test.id)}
                  style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingTests;