// src/components/ui/select.js
import React from 'react';

const Select = ({ options, value, onChange, style, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '100%',
      ...style,
    }}
    {...props}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
