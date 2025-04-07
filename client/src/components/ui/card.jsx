// Card.js
import React from 'react';

// Card Component
export const Card = ({ children, className }) => {
  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b border-teal-600 ${className}`}>
      {children}
    </div>
  );
};

// CardTitle Component
export const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-2xl font-semibold text-teal-400 ${className}`}>
      {children}
    </h2>
  );
};

// CardContent Component
export const CardContent = ({ children, className }) => {
  return (
    <div className={`p-4 text-gray-300 ${className}`}>
      {children}
    </div>
  );
};
