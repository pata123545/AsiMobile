// src/components/ViewToggle.jsx
"use client";

import { Squares2X2Icon, Bars3BottomLeftIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function ViewToggle({ currentView }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleToggle = (viewType) => {
        router.push(`/store?${createQueryString('view', viewType)}`, { scroll: false });
    };

    const baseClass = "p-2 rounded-lg transition duration-150";
    const activeClass = "bg-gray-200 text-red-600";
    const inactiveClass = "text-gray-500 hover:bg-gray-100";

    return (
        <div className="flex border border-gray-300 rounded-lg p-0.5 ml-4">
            {/* כפתור רשת (Grid) */}
            <button
                onClick={() => handleToggle('grid')}
                className={`${baseClass} ${currentView === 'grid' ? activeClass : inactiveClass}`}
                aria-label="הצג ברשת"
            >
                <Squares2X2Icon className="h-5 w-5" />
            </button>

            {/* כפתור רשימה (List) */}
            <button
                onClick={() => handleToggle('list')}
                className={`${baseClass} ${currentView === 'list' ? activeClass : inactiveClass}`}
                aria-label="הצג ברשימה"
            >
                <Bars3BottomLeftIcon className="h-5 w-5" />
            </button>
        </div>
    );
}