// src/components/ui/slider.js
import React from 'react';

const Slider = ({ min = 0, max = 100, value, onChange, style, ...props }) => (
  <input
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      ...style,
    }}
    {...props}
  />
);

export default Slider;
