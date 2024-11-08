// src/components/ui/switch.js
import React from 'react';

const Switch = ({ checked, onChange, style, ...props }) => (
  <label style={{ display: 'inline-block', ...style }}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{
        width: '40px',
        height: '20px',
        backgroundColor: checked ? '#4f46e5' : '#ccc',
        borderRadius: '20px',
        position: 'relative',
        cursor: 'pointer',
      }}
      {...props}
    />
    <span
      style={{
        display: 'block',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '0px',
        left: checked ? '20px' : '0px',
        transition: 'left 0.2s',
      }}
    />
  </label>
);

export default Switch;
