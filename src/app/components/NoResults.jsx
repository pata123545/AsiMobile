// src/components/NoResults.jsx

import React from 'react';

/**
 * רכיב המציג הודעה כאשר אין תוצאות לסינון/חיפוש.
 * @param {string} message - ההודעה המוצגת.
 */
const NoResults = ({ message = "לא נמצאו תוצאות התואמות לבחירתך." }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-gray-200 shadow-sm text-center">
            {/* אייקון ויזואלי (אפשר להחליף לאייקון רלוונטי) */}
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
            </svg>
            
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                אין תוצאות
            </h3>
            
            <p className="text-gray-500 max-w-md">
                {message}
            </p>
        
        </div>
    );
};

export default NoResults;