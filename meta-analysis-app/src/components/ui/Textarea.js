import React from 'react';

// A simple Textarea component with basic styling
const Textarea = ({ value, onChange, placeholder, rows, cols, className, ...props }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows || 4} // Default to 4 rows
      cols={cols || 50} // Default to 50 columns
      className={`border p-2 rounded ${className}`} // You can extend this with more styles
      {...props}
    />
  );
};

export default Textarea;
