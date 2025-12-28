"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; // וודא שהנתיב הזה מדויק!
import { useCart } from '../../../context/CartContext';
import { FiShoppingCart, FiLoader, FiAlertCircle } from 'react-icons/fi';

const ProductPage = () => {
    const params = useParams();
    const id = params?.id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                console.log("Searching for ID:", id); // הדפסה לבדיקה

                const { data, error: supabaseError } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (supabaseError) throw supabaseError;
                
                console.log("Product found:", data); // הדפסה לבדיקה
                setProduct(data);
            } catch (err) {
                console.error("Fetch error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-white">
            <FiLoader className="animate-spin text-blue-600" size={30} />
            <span className="mr-3 font-medium">טוען מוצר...</span>
        </div>
    );

    if (error || !product) return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <FiAlertCircle size={50} className="text-red-500 mb-4" />
            <h1 className="text-xl font-bold">לא הצלחנו למצוא את המוצר</h1>
            <p className="text-gray-500 mt-2">ID שחיפשנו: {id}</p>
            {error && <p className="text-xs text-red-400 mt-2">שגיאה: {error}</p>}
            <a href="/store" className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full font-medium">חזרה לחנות</a>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] p-6 lg:p-20" dir="rtl">
            <div className="max-w-[1150px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* תמונה */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center">
                    <img 
                        src={product.image || product.image_url || "/placeholder.png"} 
                        alt={product.name}
                        className="max-h-[400px] object-contain"
                    />
                </div>

                {/* פרטים */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-[32px] font-semibold mb-2">{product.name}</h1>
                    <p className="text-2xl font-medium text-blue-600 mb-6 font-sans">₪{product.price}</p>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-8">
                        <h3 className="font-bold mb-2">תיאור המוצר</h3>
                        <p className="text-gray-600 leading-relaxed">{product.description || "אין תיאור למוצר זה"}</p>
                    </div>

                    <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#0071e3] hover:bg-[#0077ed] text-white h-[56px] rounded-xl text-lg font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        <FiShoppingCart />
                        הוספה לסל
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;