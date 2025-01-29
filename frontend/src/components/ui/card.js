// src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white p-4 shadow-lg rounded-lg ${className}`}>
      {children}
    </div>
  );
};
