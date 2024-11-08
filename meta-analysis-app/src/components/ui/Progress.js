// src/components/ui/progress.js
import React from 'react';

const Progress = ({ value, max = 100, style, ...props }) => (
  <div
    style={{
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden',
      ...style,
    }}
    {...props}
  >
    <div
      style={{
        width: `${(value / max) * 100}%`,
        backgroundColor: '#4f46e5',
        height: '8px',
      }}
    />
  </div>
);

export default Progress;
