import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center p-4 z-50">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;