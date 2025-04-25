import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionCard from './QuestionCard';

const TestTakerDashboard: React.FC = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | undefined>(undefined);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  
  // Handle starting a specific test
  const handleStartTest = (questionId?: number) => {
    setSelectedQuestionId(questionId);
    setShowQuestion(true);
  };
  
  // Handle when a question is answered
  const handleQuestionAnswered = (questionId: number) => {
    if (!answeredQuestions.includes(questionId)) {
      setAnsweredQuestions([...answeredQuestions, questionId]);
    }
    
    // You could implement some logic here to show the next question
    // For simplicity, we'll just mark it as answered
  };
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Taker Dashboard</h1>
      <p>Welcome to your personal IELTS Speaking Test dashboard.</p>
      
      {!showQuestion ? (
        <div style={{ marginTop: '2rem' }}>
          <h2>Available Tests</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>IELTS Speaking Part 1: Introduction</h3>
              <p>Practice answering common introduction questions.</p>
              <button 
                onClick={() => handleStartTest(1)}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
            
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>IELTS Speaking Part 2: Long-turn speaking</h3>
              <p>Practice speaking on a given topic for 2 minutes.</p>
              <button 
                onClick={() => handleStartTest(2)}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
            
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>IELTS Speaking Part 3: Discussion</h3>
              <p>Practice answering in-depth questions on various topics.</p>
              <button 
                onClick={() => handleStartTest(3)}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
            
            <div style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3>Random Practice Questions</h3>
              <p>Practice with randomly selected questions from all parts.</p>
              <button 
                onClick={() => handleStartTest()}
                style={{
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  border: 'none',
                  marginTop: '1rem',
                  cursor: 'pointer'
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => setShowQuestion(false)}
            style={{
              background: '#4b5563',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              border: 'none',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Tests
          </button>
          
          <QuestionCard 
            questionId={selectedQuestionId}
            onAnswered={handleQuestionAnswered}
          />
          
          {answeredQuestions.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Progress</h3>
              <p>You have answered {answeredQuestions.length} question(s) in this session.</p>
            </div>
          )}
        </div>
      )}
      
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

export default TestTakerDashboard;