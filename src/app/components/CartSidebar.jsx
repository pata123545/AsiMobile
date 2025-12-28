// src/components/CartSidebar.jsx
"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { FiX, FiShoppingCart, FiTrash2, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import Link from 'next/link';

const CartSidebar = () => {
    
    const { 
        cartItems, 
        totalPrice, 
        totalItems, 
        removeFromCart, 
        updateQuantity,
        isCartSidebarVisible: isVisible, 
        closeCartSidebar: onClose 
    } = useCart();
    
    const handleUpdateQuantity = (item, action) => {
        if (action === 'increment') {
            updateQuantity(item.id, item.quantity + 1);
        } else if (action === 'decrement') {
            if (item.quantity > 1) {
                updateQuantity(item.id, item.quantity - 1);
            } else {
                removeFromCart(item.id);
            }
        }
    };

    if (!isVisible && totalItems === 0 && cartItems.length === 0) {
        return null;
    }
    
    const sidebarClasses = `
        fixed top-0 z-50 h-screen w-full max-w-sm bg-white shadow-xl 
        transition-transform duration-500 ease-in-out
        left-0 
        ${isVisible ? 'translate-x-0' : '-translate-x-full'}
    `;

    // גובה הכותרת הוא בערך 65px. נשתמש ב-calc כדי לקבוע את גובה שאר הסייד-באר.
    const cartContentHeight = 'h-[calc(100vh-65px)]'; 

    return (
        <>
            {isVisible && (
                <div 
                    className="fixed inset-0 bg-black/50 bg-opacity-30 z-50 transition-opacity duration-300"
                    onClick={onClose}
                ></div>
            )}

            <div 
                className={sidebarClasses} 
                dir="rtl" 
            >
                
                {/* 1. Header (קבוע למעלה) */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <FiShoppingCart className="ml-2" />
                        סל הקניות ({totalItems})
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition p-1">
                        <FiX size={24} />
                    </button>
                </div>


                <div className={`flex flex-col ${cartContentHeight}`}> 
                    
                    {/* תוכן עגלה ריקה */}
                    {cartItems.length === 0 ? (
                        <div className="p-8 text-center mt-12 flex-grow">
                            <FiShoppingCart size={40} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">העגלה שלך ריקה.</p>
                            <button onClick={onClose} className="mt-4 text-black font-semibold hover:text-blue-700">
                                להמשיך בקניות
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* 3. רשימת פריטים (האזור שגולל) */}
                            {/* flex-grow מבטיח שהוא ממלא את השטח, overflow-y-auto מאפשר גלילה רק כאן */}
                            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                {cartItems.map((item) => (
                                    // ⭐️ ודא שכל פריט משתמש ב-w-full ⭐️
                                    <div key={item.id} className="flex items-center justify-between border-b pb-4 w-full"> 
                                        
                                        {/* עטיפה פנימית: flex ו-w-full למניעת גלישה אופקית */}
                                        <div className="flex items-center justify-between w-full">
                                            
                                            {/* פרטי פריט - flex-grow ו-min-w-0 לטיפול בטקסט ארוך */}
                                            <div className="flex items-center space-x-3 space-x-reverse flex-grow min-w-0">
                                                <img src={item.image_url || 'https://via.placeholder.com/60'} alt={item.name} className="w-12 h-12 object-cover rounded flex-shrink-0" />
                                                
                                                <div className="text-right flex-grow min-w-0 overflow-hidden"> 
                                                    {/* truncate חותך כותרות ארוכות */}
                                                    <p className="font-semibold text-sm truncate">{item.name}</p> 
                                                    <p className="text-xs text-gray-500">{parseFloat(item.price).toFixed(2)} ₪</p>
                                                </div>
                                            </div>
                                            
                                            {/* כמות ומחיקה (flex-shrink-0) */}
                                            <div className="flex items-center text-gray-600 flex-shrink-0 ml-2"> 
                                                <button onClick={() => handleUpdateQuantity(item, 'increment')} className="text-green-500 hover:text-green-600 p-1"><FiPlusCircle size={18} /></button>
                                                <span className="mx-2 font-semibold text-sm">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item, 'decrement')} className="text-red-500 hover:text-red-600 p-1"><FiMinusCircle size={18} /></button>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 mr-2 transition"><FiTrash2 size={18} /></button>
                                            </div>
                                            
                                            {/* סכום ביניים (flex-shrink-0) */}
                                            <p className="text-md font-bold text-black ml-4 flex-shrink-0">
                                                {(item.price * item.quantity).toFixed(2)} ₪
                                            </p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        
                            {/* 4. Summary ו-CTA (קבועים בתחתית) */}
                            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                                <div className="flex justify-between font-bold text-lg mb-3">
                                    <span>סה"כ:</span>
                                    <span className="text-black">{totalPrice.toFixed(2)} ₪</span>
                                </div>
                                <Link 
                                    href="/cart" 
                                    onClick={onClose} 
                                    className="w-full block text-center bg-black text-white font-bold text-lg py-3 rounded-lg hover:bg-green-700 transition"
                                >
                                    מעבר לתשלום (Checkout)
                                </Link>
                            </div>
                        </>
                    )}
                </div> {/* סוף div עוטף Flexbox */}
            </div>
        </>
    );
};

export default CartSidebar;