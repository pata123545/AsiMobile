// src/components/SortDropdown.jsx
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// אפשרויות המיון שיוצגו למשתמש
const sortOptions = [
    { value: 'default', label: 'ברירת מחדל (פופולריות)' },
    { value: 'price_asc', label: 'מחיר: נמוך לגבוה' },
    { value: 'price_desc', label: 'מחיר: גבוה לנמוך' },
    { value: 'newest', label: 'חדש ביותר' },
    { value: 'rating', label: 'דירוג ממוצע' },
];

export default function SortDropdown({ currentParams }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // פונקציה ליצירת כתובת URL חדשה עם פרמטר מיון מעודכן
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            
            // אם הערך הוא 'default', מסירים את פרמטר המיון מה-URL
            if (value === 'default') {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            
            // תמיד נאפס את העמוד לעמוד 1 כאשר המיון משתנה
            params.delete('page'); 

            return params.toString();
        },
        [searchParams]
    );

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        // ניווט לכתובת ה-URL החדשה
        router.push(`/store?${createQueryString('sort', selectedValue)}`, { scroll: false });
    };
    
    // קריאת ערך המיון הנוכחי מה-URL (או שימוש בברירת מחדל)
    const currentSort = searchParams.get('sort') || 'default';

    return (
        <div className="flex items-center space-x-2 space-x-reverse text-sm">
            <label htmlFor="sort-dropdown" className="text-gray-600 font-medium whitespace-nowrap hidden sm:block">
                מיון לפי:
            </label>
            <select
                id="sort-dropdown"
                name="sort-dropdown"
                className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                value={currentSort}
                onChange={handleSortChange}
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}