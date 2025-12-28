"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import CheckoutButton from '../components/CheckoutButton';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiShield } from 'react-icons/fi';
import Image from 'next/image';

const CartPage = () => {
    // השתמשתי ב-cartItems כפי שהגדרת ב-Context שלך
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
    const router = useRouter();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6" dir="rtl">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <FiShoppingCart size={48} />
                </div>
                <h2 className="text-3xl font-black italic tracking-tighter text-gray-900">הסל שלך ריק</h2>
                <p className="text-gray-500 font-medium">נראה שעדיין לא הוספת מוצרים לסל הקניות שלך.</p>
                <button onClick={() => router.push('/store')} className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
                    חזרה לחנות
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-16 px-4" dir="rtl">
            <div className="max-w-6xl mx-auto">
                
                {/* כותרת דף */}
                <div className="flex items-end gap-4 mb-12">
                    <h1 className="text-5xl font-black italic tracking-tighter leading-none text-gray-900">סל הקניות</h1>
                    <span className="text-gray-400 font-bold text-xl">({cartItems.length} מוצרים)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    
                    {/* רשימת מוצרים */}
                    <div className="lg:col-span-8 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-[2.5rem] p-6 flex items-center gap-6 shadow-sm border border-gray-100 group transition-all hover:shadow-md">
                                <div className="w-28 h-28 bg-gray-50 rounded-[2rem] overflow-hidden relative flex-shrink-0 border border-gray-100">
                                    <Image 
                                        src={item.image_url || item.image || 'https://via.placeholder.com/150'} 
                                        alt={item.name} 
                                        fill 
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{item.name}</h3>
                                    <p className="text-gray-400 text-sm mb-4 italic">יבואן רשמי - גרסה גלובלית</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                        <div className="text-xl font-black text-gray-900">₪{item.price.toLocaleString()}</div>
                                    </div>
                                </div>

                                <button onClick={() => removeFromCart(item.id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                    <FiTrash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* סיכום הזמנה */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[3rem] p-10 shadow-2xl sticky top-24 border border-gray-100">
                            <h2 className="text-2xl font-black mb-8 italic tracking-tighter border-b border-gray-100 pb-4">סיכום הזמנה</h2>
                            
                            <div className="space-y-4 mb-10">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>סכום ביניים</span>
                                    <span>₪{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>משלוח אקספרס</span>
                                    <span className="text-green-600 font-bold">חינם</span>
                                </div>
                                <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                    <div>
                                        <p className="text-gray-400 text-[10px] font-black mb-1 uppercase tracking-widest">סה"כ לתשלום</p>
                                        <span className="text-4xl font-black tracking-tighter text-gray-900">₪{totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* כאן נמצא הרכיב החדש שלך - שים לב כמה זה נקי עכשיו */}
                            <CheckoutButton cartItemsCount={cartItems.length} />

                            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                <FiShield size={14} />
                                <span>תשלום מאובטח SSL בתקן 256-bit</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;