"use client";

import React from 'react';
import Link from 'next/link';
import { FiHeart, FiArrowRight } from 'react-icons/fi';

const EmptyWishlist = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-white" dir="rtl">
            
            {/* אייקון מרכזי מעוצב */}
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center animate-pulse">
                    <FiHeart size={48} className="text-gray-200" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full border-4 border-white"></div>
            </div>

            {/* תוכן טקסטואלי */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                רשימת המשאלות שלך ריקה
            </h1>
            <p className="text-gray-500 text-base max-w-[280px] mb-10 leading-relaxed">
                נראה שעדיין לא הוספת מוצרים שאהבת. זה הזמן למצוא את המכשיר הבא שלך!
            </p>

            {/* כפתור הנעה לפעולה מודרני */}
            <Link 
                href="/store" 
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
                <span>חזרה לחנות</span>
                <FiArrowRight className="transition-transform group-hover:-translate-x-1" />
            </Link>

            {/* אלמנטים עיצוביים ברקע (אופציונלי) */}
            <div className="mt-12 flex gap-2">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 bg-gray-100 rounded-full"></div>
                ))}
            </div>
        </div>
    );
};

export default EmptyWishlist;