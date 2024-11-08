// src/components/ui/input.js
import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={{
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
    }}
    {...props}
  />
);

export default Input;
