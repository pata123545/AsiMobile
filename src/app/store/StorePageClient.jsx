"use client"; // חובה בראש הקובץ

import React, { useState } from 'react';
import ProductFilters from '../components/ProductFilters'; 
import ProductCard from '../components/ProductCard'; 
import Pagination from '../components/Pagination';
import { FiFilter, FiX } from 'react-icons/fi';

export default function StorePageClient({ 
    products = [], 
    totalPages = 1, 
    totalResults = 0, 
    filterOptions = { brands: [], colors: [], storages: [] }, 
    params = {},
    currentPage = 1 
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const safeProducts = Array.isArray(products) ? products : [];
    const safeFilterOptions = filterOptions || { brands: [], colors: [], storages: [] };

    return (
        <div className="container mx-auto p-4 md:flex min-h-screen" dir="rtl">
            
            {/* כפתור פתיחת סינון - מובייל בלבד */}
            <div className="md:hidden mb-4">
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 py-3 rounded-xl shadow-sm font-bold text-gray-700 active:bg-gray-50 transition-all"
                >
                    <FiFilter size={18} className="text-blue-600" />
                    סנן מוצרים
                </button>
            </div>

            {/* סרגל הסינון ל-Desktop */}
            <aside className="hidden md:block md:w-1/4 md:pr-4">
                <ProductFilters initialFilterOptions={safeFilterOptions} />
            </aside>

            {/* מגירת סינון למובייל */}
            <div className={`fixed inset-0 z-[1000] md:hidden transition-all duration-300 ${isFilterOpen ? 'visible' : 'invisible'}`}>
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsFilterOpen(false)}
                />
                
                <div className={`absolute right-0 top-0 h-full w-[85%] bg-white shadow-2xl transition-transform duration-300 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold text-gray-900">סינון מוצרים</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <FiX size={24} />
                            </button>
                        </div>
                        <ProductFilters initialFilterOptions={safeFilterOptions} />
                        <button 
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mt-8"
                        >
                            סיום סינון
                        </button>
                    </div>
                </div>
            </div>
            
            <main className="md:w-3/4 md:mr-10">
                <header className="mb-6 flex justify-between items-center text-right">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {params?.category || 'כל המוצרים'} 
                        <span className="text-sm font-normal text-gray-500 mr-2">({totalResults} מוצרים)</span>
                    </h1>
                </header>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {safeProducts.length > 0 ? (
                        safeProducts.map((product) => (
                            <ProductCard key={product.id} product={product} /> 
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500 font-medium text-lg">לא נמצאו מוצרים.</p>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination totalPages={totalPages} currentPage={currentPage} />
                    </div>
                )}
            </main>
        </div>
    );
}