import React from 'react';

const ColorSwatch = ({ color }) => (
  <span
    style={{
      backgroundColor: color,
      height: '30px',
      width: '30px',
      display: 'inline-block',
    }}
  />
);

export default ColorSwatch;
