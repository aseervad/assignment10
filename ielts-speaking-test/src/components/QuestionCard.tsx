import React, { useState, useEffect } from 'react';

// Define the Question interface
interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
}

// Define the props for the QuestionCard component
interface QuestionCardProps {
  questionId?: number; // Optional ID to fetch a specific question
  onAnswered?: (questionId: number) => void; // Optional callback when question is answered
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, onAnswered }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock API call function to fetch a question
  const fetchQuestion = async (id?: number) => {
    try {
      setLoading(true);
      
      // In a real app, this would be a fetch call to your backend API
      // For demonstration, we'll simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data - in a real app, this would come from your API
      const mockQuestions: Question[] = [
        { id: 1, text: "Tell me about your hometown.", category: "Personal", difficulty: "Easy" },
        { id: 2, text: "Do you prefer living in a house or an apartment? Why?", category: "Living Situation", difficulty: "Medium" },
        { id: 3, text: "Describe a book that made an impression on you.", category: "Literary", difficulty: "Hard" },
        { id: 4, text: "How often do you use public transportation?", category: "Transportation", difficulty: "Easy" },
      ];
      
      if (id) {
        const foundQuestion = mockQuestions.find(q => q.id === id);
        if (foundQuestion) {
          setQuestion(foundQuestion);
        } else {
          setError("Question not found");
        }
      } else {
        // Get a random question if no ID provided
        const randomIndex = Math.floor(Math.random() * mockQuestions.length);
        setQuestion(mockQuestions[randomIndex]);
      }
      
      setLoading(false);
    } catch (err) {
        console.error("Error fetching question:", err); // Use the err variable by logging it
        setError("Failed to fetch question");
        setLoading(false);
      }
  };
  
  useEffect(() => {
    fetchQuestion(questionId);
  }, [questionId]);
  
  // Handle user answering the question
  const handleAnswered = () => {
    if (question && onAnswered) {
      onAnswered(question.id);
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '2rem',
        margin: '1rem 0',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p>Loading question...</p>
      </div>
    );
  }
  
  // Show error state
  if (error) {
    return (
      <div style={{
        border: '1px solid #feb2b2',
        borderRadius: '8px',
        padding: '2rem',
        margin: '1rem 0',
        backgroundColor: '#fff5f5',
        color: '#e53e3e',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p>Error: {error}</p>
        <button 
          onClick={() => fetchQuestion(questionId)} 
          style={{
            background: '#e53e3e',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            marginTop: '1rem',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
  
  // Show question
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '2rem',
      margin: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <span style={{
          backgroundColor: '#e2e8f0',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          Question #{question?.id}
        </span>
        <span style={{
          backgroundColor: question?.difficulty === 'Easy' ? '#c6f6d5' : 
                          question?.difficulty === 'Medium' ? '#fefcbf' : '#fed7d7',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.875rem'
        }}>
          {question?.difficulty}
        </span>
      </div>
      
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        {question?.text}
      </h3>
      
      <div style={{ 
        backgroundColor: '#f7fafc',
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem'
      }}>
        <p style={{ fontStyle: 'italic' }}>
          Category: {question?.category}
        </p>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button 
          onClick={() => fetchQuestion()}
          style={{
            background: '#3182ce',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Next Question
        </button>
        
        <button 
          onClick={handleAnswered}
          style={{
            background: '#48bb78',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Mark as Answered
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;