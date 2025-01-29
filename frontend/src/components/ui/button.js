// src/components/ui/button.js
import React from 'react';

export const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-20 py-4 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-lg ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};
