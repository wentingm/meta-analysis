import React from 'react';

export const Alert = ({ children, className }) => {
  return (
    <div className={`p-4 mb-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return (
    <div className="text-sm text-gray-700">
      {children}
    </div>
  );
};
