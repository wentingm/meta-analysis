// src/components/ui/label.js
import React from 'react';

const Label = ({ htmlFor, children, style, ...props }) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: 'block',
      marginBottom: '4px',
      fontWeight: '500',
      color: '#374151',
      ...style,
    }}
    {...props}
  >
    {children}
  </label>
);

export default Label;
