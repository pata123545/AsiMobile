// src/components/Sidebar.jsx
"use client";

import React, { useState } from 'react';
// ייבוא אייקונים לדוגמה
import { FiMonitor, FiSmartphone, FiTablet, FiHeadphones, FiTool, FiBox } from 'react-icons/fi';
import Link from 'next/link';

// ⭐️ נתוני דוגמה לקטגוריות ⭐️
const categories = [
    { name: 'מחשבים ניידים', icon: FiMonitor, href: '/store?category=laptops' },
    { name: 'מכשירי סלולר', icon: FiSmartphone, href: '/store?category=phones' },
    { name: 'טאבלטים', icon: FiTablet, href: '/store?category=tablets' },
    { name: 'אוזניות', icon: FiHeadphones, href: '/store?category=headphones' },
    { name: 'מעבדת תיקונים', icon: FiTool, href: '/repair' },
    { name: 'אביזרים לסלולר', icon: FiBox, href: '/store?category=accessories' },
];

export default function Sidebar() {
    
    const [isExpanded, setIsExpanded] = useState(false);

    // הגדרת רוחב וגובה עליון
    const baseWidth = 'w-20';    
    const expandedWidth = 'w-64';   
    const HEADER_HEIGHT_CLASS = 'top-20.5'; 

    const sidebarClasses = `fixed ${HEADER_HEIGHT_CLASS} right-0 h-full shadow-sm bg-white shadow-xl z-60 transition-width duration-300 ease-in-out ${
        isExpanded ? expandedWidth : baseWidth
    }`;

    return (
        <aside
            dir="rtl"
            className={sidebarClasses}
            onMouseEnter={() => setIsExpanded(true)} // פתיחה בריחוף
            onMouseLeave={() => setIsExpanded(false)} // סגירה ביציאה
        >
            <nav className="flex flex-col p-2 space-y-1">
                
                {/* כותרת כל הקטגוריות */}
                <h3 className={`text-right text-lg font-bold text-gray-700 p-2 transition-opacity duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                }`}>
                    כל הקטגוריות
                </h3>
                
               
                {categories.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200"
                    >
                        {/* האייקון - תמיד מוצג */}
                        <item.icon size={24} className="flex-shrink-0" />
                        
                        {/* שם הקטגוריה - מוצג רק במצב פתוח */}
                        <span 
                            className={`mr-4 whitespace-nowrap transition-all duration-300 ${
                                isExpanded ? 'opacity-100 ml-0' : 'opacity-0 ml-[-20px]' 
                            }`}
                        >
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}