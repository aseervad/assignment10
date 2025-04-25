import React, { useState } from 'react';

const TestStartButton: React.FC = () => {
  // State to track if test has started
  const [isStarted, setIsStarted] = useState<boolean>(false);
  
  // Function to handle button click
  const handleStartTest = () => {
    setIsStarted(true);
  };
  
  return (
    <button 
      onClick={handleStartTest}
      disabled={isStarted}
      style={{
        backgroundColor: isStarted ? '#9ca3af' : '#2563eb',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: isStarted ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.3s ease'
      }}
    >
      {isStarted ? 'Test Started' : 'Start Test'}
    </button>
  );
};

export default TestStartButton;