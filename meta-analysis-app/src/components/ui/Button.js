// src/components/ui/button.js
import React from 'react';

const Button = ({ children, onClick, style, ...props }) => (
  <button
    onClick={onClick}
    style={{
      padding: '10px 16px',
      backgroundColor: '#4f46e5',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;
