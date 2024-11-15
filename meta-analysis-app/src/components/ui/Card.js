import React from 'react';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};

export const CardFooter = ({ children }) => {
  return (
    <div className="flex items-center p-6 pt-0 flex justify-between text-sm text-gray-500">
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return (
    <h2 className="text-lg font-semibold text-gray-900">
      {children}
    </h2>
  );
};

export const CardDescription = ({ children }) => {
  return (
    <p className="text-gray-600">
      {children}
    </p>
  );
};
