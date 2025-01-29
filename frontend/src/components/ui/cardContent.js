// src/components/ui/cardContent.js
import React from 'react';

export const CardContent = ({ children, className }) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {children}
    </div>
  );
};
