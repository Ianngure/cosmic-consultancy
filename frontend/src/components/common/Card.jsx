import React from 'react';

const Card = ({ children, className = '', hover = false, padding = 'p-6' }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md ${padding} ${
        hover ? 'hover:shadow-xl transition-shadow duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;