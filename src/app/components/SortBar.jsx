// src/components/SortBar.jsx
import React from 'react';
import { FiChevronDown, FiGrid, FiList } from 'react-icons/fi';

const SortBar = ({ sortBy, updateSort }) => {
    
    // אפשרויות מיון
    const sortOptions = [
        { value: 'default', label: 'ברירת מחדל (שם א-ת)' },
        { value: 'price_asc', label: 'מחיר: מהנמוך לגבוה' },
        { value: 'price_desc', label: 'מחיר: מהגבוה לנמוך' },
        { value: 'newest', label: 'מוצרים חדשים' },
        { value: 'rating', label: 'דירוג ממוצע' },
    ];

    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mb-6 border border-gray-100" dir="rtl">
            
            {/* צד ימין: בחירת מיון */}
            <div className="flex items-center space-x-3 space-x-reverse">
                <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 whitespace-nowrap">מיון לפי:</label>
                <div className="relative">
                    <select 
                        id="sort-select"
                        value={sortBy} 
                        onChange={(e) => updateSort(e.target.value)} 
                        className="block w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm appearance-none pr-8 cursor-pointer"
                    >
                        {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <FiChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
            </div>

            {/* צד שמאל: תצוגת מוצרים וספירת מוצרים (סטטית כרגע) */}
            <div className="flex items-center space-x-4 space-x-reverse hidden sm:flex">
                <span className="text-sm text-gray-600">
                    מציג מוצרים...
                </span>
                
                <div className="flex space-x-1 space-x-reverse border border-gray-200 rounded-md p-1 bg-white">
                    <button className="p-1 text-gray-800 bg-gray-100 rounded-md shadow-sm">
                        <FiGrid size={20} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                        <FiList size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SortBar;