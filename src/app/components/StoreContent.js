"use client";
import React, { useState } from 'react';
import ProductFilters from './ProductFilters';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import { FiFilter, FiX } from 'react-icons/fi';

export default function StoreContent({ 
    products = [], 
    totalPages, 
    totalResults, 
    filterOptions, 
    categoryNames, 
    params, 
    currentPage 
}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div className="container mx-auto p-4 md:flex">
            {/* כפתור סינון למובייל */}
            <div className="md:hidden mb-4">
                <button 
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 py-3 rounded-xl shadow-sm font-bold text-gray-700"
                >
                    <FiFilter size={18} /> סנן מוצרים
                </button>
            </div>

            {/* סינון Desktop */}
            <div className="hidden md:block md:w-1/4 md:pr-4">
                <ProductFilters initialFilterOptions={filterOptions} initialCategoryNames={categoryNames} />
            </div>

            {/* מגירת סינון מובייל */}
            <div className={`fixed inset-0 z-[150] md:hidden ${isFilterOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-black/50 transition-opacity ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterOpen(false)} />
                <div className={`absolute right-0 top-0 h-full w-[85%] bg-white p-5 transition-transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">סינון מוצרים</h2>
                        <button onClick={() => setIsFilterOpen(false)}><FiX size={24} /></button>
                    </div>
                    <ProductFilters initialFilterOptions={filterOptions} initialCategoryNames={categoryNames} />
                </div>
            </div>

            {/* הצגת המוצרים */}
            <div className="md:w-3/4 md:mr-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                    {params.category || 'כל המוצרים'} ({totalResults})
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products?.length > 0 ? (
                        products.map((product) => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p className="col-span-full text-center text-gray-500 mt-10">לא נמצאו מוצרים.</p>
                    )}
                </div>
                {totalPages > 1 && <div className="mt-8"><Pagination totalPages={totalPages} currentPage={currentPage} /></div>}
            </div>
        </div>
    );
}