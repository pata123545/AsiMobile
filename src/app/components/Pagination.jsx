// src/components/Pagination.jsx
"use client";

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function Pagination({ totalPages, currentPage }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // הפונקציה ליצירת URL מעודכן
    const createPageURL = useCallback((page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return params.toString();
    }, [searchParams]);

    // יצירת כפתור ומנגנון לחיצה
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            router.push(`/store?${createPageURL(page)}`, { scroll: false });
        }
    };
    
    // יצירת מערך כפתורי הדפדוף שיוצגו
    const getPageNumbers = () => {
        const delta = 2; // כמה כפתורים להציג סביב הדף הנוכחי
        const range = [];

        // הוסף את הדף הראשון
        range.push(1);
        
        // צור טווח סביב הדף הנוכחי
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i > 1 && i < totalPages) {
                range.push(i);
            }
        }
        
        // הוסף את הדף האחרון (אם הוא לא נכלל כבר)
        if (totalPages > 1) {
            range.push(totalPages);
        }
        
        // הסרת כפילויות ומיון
        const uniqueRange = [...new Set(range)].sort((a, b) => a - b);
        
        // הוספת מפריד (...)
        const finalPages = [];
        let lastPage = 0;
        for (const page of uniqueRange) {
            if (page > lastPage + 1) {
                finalPages.push('...');
            }
            finalPages.push(page);
            lastPage = page;
        }
        return finalPages;
    };


    if (totalPages <= 1) return null; // אין צורך בדפדוף אם יש רק עמוד אחד

    return (
        <nav className="flex items-center justify-center space-x-2 space-x-reverse" aria-label="Pagination">
            {/* כפתור קודם */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
                <span className="sr-only">הקודם</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* מספרי העמודים */}
            {getPageNumbers().map((page, index) => (
                <div key={index}>
                    {page === '...' ? (
                        <span className="px-3 py-2 text-gray-500">...</span>
                    ) : (
                        <button
                            onClick={() => handlePageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition duration-150 
                                ${page === currentPage 
                                    ? 'z-10 bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500' 
                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                                }
                            `}
                        >
                            {page}
                        </button>
                    )}
                </div>
            ))}

            {/* כפתור הבא */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
                <span className="sr-only">הבא</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        </nav>
    );
}