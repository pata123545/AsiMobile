// src/components/ProductList.jsx
"use client"; 

import React, { useState, useEffect } from 'react';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';
// ודא שרכיבים אלה קיימים: ProductCard, ושירות הנתונים fetchProducts
import ProductCard from './ProductCard'; 
import { fetchProducts } from '../../lib/data'; 

const ProductList = ({ filters = {} }) => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // הוספנו מצב שגיאה לטיפול בכשל בחיבור
    
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null); // איפוס שגיאות לפני כל שליפה
            
            // ניתן להשתמש ב-console.log כאן כדי לוודא שהפילטרים נשלחים כראוי
            // console.log("Starting fetch with filters:", filters); 

            try {
                // ⭐️ שליפת נתונים אמיתיים מ-Supabase עם הפרמטרים העדכניים ⭐️
                const data = await fetchProducts(filters); 
                
                // console.log("Fetched product count:", data ? data.length : 0);
                
                setProducts(data || []); // ודא ש-products הוא תמיד מערך, גם אם Supabase מחזיר null
            } catch (err) {
                console.error("Failed to fetch products from Supabase:", err);
                setError("אירעה שגיאה בטעינת המוצרים. אנא בדוק את הגדרות ה-Supabase (RLS/Keys).");
                setProducts([]); // נקה את המוצרים במקרה של שגיאה חמורה
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
        
    }, [filters]); // רץ שוב כאשר אובייקט filters משתנה

    // 1. מצב טעינה
    if (loading) {
        return (
            <div dir="rtl" className="flex justify-center items-center py-20 min-h-64">
                <FiLoader className="animate-spin text-blue-600 ml-2" size={36} />
                <p className="text-xl text-gray-600">טוען מוצרים...</p>
            </div>
        );
    }
    
    // 2. מצב שגיאה בחיבור (לדוגמה, RLS או מפתחות שגויים)
    if (error) {
        return (
            <div dir="rtl" className="text-center py-20 min-h-64 bg-red-50 border border-red-300 rounded-lg p-6">
                <FiAlertTriangle className="text-red-600 mx-auto mb-4" size={36} />
                <h2 className="text-xl font-bold text-red-700 mb-2">שגיאת חיבור!</h2>
                <p className="text-gray-700">{error}</p>
                <p className="text-sm text-gray-500 mt-2">בדוק את הקונסול (F12) לפרטים נוספים.</p>
            </div>
        );
    }
    
    // 3. מצב אין מוצרים (כתוצאה מסינון או טבלה ריקה)
    if (products.length === 0) {
        return (
            <div dir="rtl" className="text-center py-20 min-h-64 bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">🔍 לא נמצאו מוצרים תואמים לחיפוש.</h2>
                <p className="text-gray-500">נסה לאפס את המסננים או לבדוק את טבלת המוצרים שלך ב-Supabase.</p>
            </div>
        );
    }

    // 4. הצגת המוצרים
    return (
        <div dir="rtl" className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} /> 
                ))}
            </div>
        </div>
    );
};

export default ProductList;