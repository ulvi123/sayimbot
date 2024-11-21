import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            {children}
        </div>
    );
};

export const CardHeader = ({ children }) => (
    <div className="border-b border-gray-200 pb-2">
        {children}
    </div>
);

export const CardContent = ({ children }) => (
    <div className="pt-2">
        {children}
    </div>
);

export const CardTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-gray-800">
        {children}
    </h2>
);

export default Card;