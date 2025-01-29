import React from 'react';

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export {LoadingPage};
