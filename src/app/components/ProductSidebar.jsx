// src/components/ProductSidebar.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { FiX, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';

const ProductSidebar = () => {
    
    const { 
        isProductSidebarVisible, 
        selectedProduct, 
        closeProductSidebar, 
        addToCart 
    } = useCart();

    const [quantity, setQuantity] = useState(1);
    
    // אפס את הכמות כאשר משנים מוצר או פותחים
    useEffect(() => {
        if (selectedProduct) {
            setQuantity(1);
        }
    }, [selectedProduct]);

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, quantity);
            // סוגר את הסייד-באר של המוצר ופותח את סייד-באר העגלה
            closeProductSidebar();
            // הערה: נצטרך לייבא openCartSidebar מהקונטקסט ולפתוח אותו כאן אם רוצים לפתוח את העגלה
        }
    };
    
    // קלאסים לטרנספורמציה (כמו בסייד-באר כניסה שעבד)
    const sidebarClass = isProductSidebarVisible ? 'translate-x-0' : '-translate-x-full'; 
    
    if (!selectedProduct) return null; // לא מציג כלום אם אין מוצר נבחר

    return (
        <>
            {/* רקע שחור חצי שקוף (Overlay) */}
            {isProductSidebarVisible && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
                    onClick={closeProductSidebar}
                ></div>
            )}

            {/* רכיב הסייד-באר הראשי (פתיחה משמאל) */}
            <div 
                // fixed top-0 bottom-0 left-0 כדי להבטיח גובה מלא
                className={`fixed top-0 bottom-0 left-0 w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-500 ${sidebarClass}`}
            >
                
                {/* Header של הסייד-באר */}
                <div dir="rtl" className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-bold text-gray-800">
                        {selectedProduct.name}
                    </h2>
                    <button onClick={closeProductSidebar} className="text-gray-500 hover:text-gray-900 transition p-1">
                        <FiX size={24} />
                    </button>
                </div>

                {/* תוכן פרטי המוצר (ניתן לגלילה) */}
                <div dir="rtl" className="overflow-y-auto h-[calc(100%-100px)] p-4">
                    <img 
                        src={selectedProduct.image_url || 'https://via.placeholder.com/400'} 
                        alt={selectedProduct.name} 
                        className="w-full h-auto object-cover rounded mb-4" 
                    />
                    
                    <h3 className="text-2xl font-bold mb-2 text-blue-700">
                        {parseFloat(selectedProduct.price).toFixed(2)} ₪
                    </h3>
                    
                    {/* תיאור (נניח שהוא קיים באובייקט המוצר) */}
                    <p className="text-gray-600 mb-6">
                        {selectedProduct.description || 'תיאור מפורט של המוצר, יתרונותיו ותכונותיו העיקריות.'}
                    </p>

                    {/* קבוצת מאפיינים נוספים */}
                    <div className="border-t pt-4">
                        <p className="font-semibold text-gray-800 mb-2">מידע נוסף:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mr-4">
                            <li>צבע: {selectedProduct.color || 'כחול חצות'}</li>
                            <li>יצרן: {selectedProduct.manufacturer || 'ASI Mobile'}</li>
                            <li>אחריות: {selectedProduct.warranty || 'שנה יבואן רשמי'}</li>
                        </ul>
                    </div>
                </div>

                {/* Footer: כמות וכפתור הוספה לעגלה */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 flex justify-between items-center z-10">
                    
                    {/* בורר כמות */}
                    <div className="flex items-center space-x-3 space-x-reverse">
                        <button 
                            onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                            className="text-red-500 hover:text-red-600 p-2 border rounded-full transition"
                        >
                            <FiMinus size={18} />
                        </button>
                        <span className="text-xl font-bold w-6 text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(q => q + 1)} 
                            className="text-green-500 hover:text-green-600 p-2 border rounded-full transition"
                        >
                            <FiPlus size={18} />
                        </button>
                    </div>

                    {/* כפתור הוספה */}
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 mr-4 bg-blue-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                    >
                        <FiShoppingCart className="ml-2" />
                        הוסף לעגלה ({parseFloat(selectedProduct.price * quantity).toFixed(2)} ₪)
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductSidebar;