import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#1e293b',
      color: 'white',
      textAlign: 'center',
      padding: '1rem',
      marginTop: 'auto'
    }}>
      <p>© 2024 IELTS Speaking Test Platform</p>
      <p>Contact: support@ielts.com</p>
    </footer>
  );
};

export default Footer;