// src/components/ActiveFilters.jsx
"use client";

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function ActiveFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    
    // אובייקט של כל הפילטרים הפעילים (ניתן להרחבה)
    // הערך הוא השם המוצג למשתמש
    const filterLabels = {
        category: 'קטגוריה',
        minPrice: 'מחיר ממינימום',
        maxPrice: 'מחיר עד מקסימום',
        sort: 'מיון',
        // ... הוסף כאן את כל הפילטרים האפשריים שלך
    };
    
    // יצירת מערך של הפילטרים הפעילים הנוכחיים
    const activeFilters = [];
    for (const [key, value] of searchParams.entries()) {
        if (filterLabels[key] && value && value !== 'all' && value !== 'default') {
            activeFilters.push({
                key: key,
                label: filterLabels[key],
                value: value
            });
        }
    }

    const handleRemoveFilter = useCallback((keyToRemove) => {
        params.delete(keyToRemove);
        // ודא שמסירים גם פרמטרים נלווים אם יש
        if (keyToRemove === 'minPrice' || keyToRemove === 'maxPrice') {
             params.delete('minPrice');
             params.delete('maxPrice');
        }
        
        // ניווט לכתובת URL חדשה
        router.push(`/store?${params.toString()}`, { scroll: false });
    }, [router, params]);

    if (activeFilters.length === 0) {
        return null; // לא מציג כלום אם אין פילטרים פעילים
    }

    return (
        <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-gray-700 ml-2 whitespace-nowrap">מסונן לפי:</span>
            
            {activeFilters.map((filter) => (
                <div 
                    key={filter.key} 
                    className="flex items-center bg-red-100 text-red-800 rounded-full px-3 py-1 border border-red-300"
                >
                    <span className="font-medium mr-1">
                        {filter.label}: 
                    </span>
                    <span className="text-sm font-light">
                        {filter.value}
                    </span>
                    <button 
                        onClick={() => handleRemoveFilter(filter.key)}
                        className="ml-1 p-0.5 rounded-full hover:bg-red-200"
                        aria-label={`הסר פילטר ${filter.label}`}
                    >
                        <XMarkIcon className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}