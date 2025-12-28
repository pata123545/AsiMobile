"use client";

import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiSearch, FiMapPin } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState(null); // 'processing', 'shipped', 'delivered'
    const [loading, setLoading] = useState(false);

const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setOrderStatus(null); // איפוס תוצאה קודמת

    try {
        const { data, error } = await supabase
            .from('orders')
            .select('status, order_number')
            .eq('order_number', orderId.trim().toUpperCase()) // מחפש התאמה מדויקת
            .single(); // מחזיר אובייקט אחד בלבד

        if (error || !data) {
            toast.error("הזמנה לא נמצאה. בדוק את המספר ונסה שוב.");
            return;
        }

        setOrderStatus(data.status); // מעדכן את הסטטוס מהדאטה-בייס
    } catch (err) {
        console.error("Tracking error:", err);
        toast.error("שגיאה בחיבור לשרת");
    } finally {
        setLoading(false);
    }
};

    const steps = [
        { id: 'processing', label: 'בהכנה', icon: <FiPackage />, desc: 'ההזמנה שלך נארזת באהבה' },
        { id: 'shipped', label: 'בדרך אליך', icon: <FiTruck />, desc: 'השליח אסף את החבילה' },
        { id: 'delivered', label: 'נמסר', icon: <FiCheckCircle />, desc: 'החבילה הגיעה ליעדה' },
    ];

    const currentStepIndex = steps.findIndex(step => step.id === orderStatus);

    return (
        <div className="min-h-screen bg-[#f8f9fa] py-20 px-4" dir="rtl">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black italic tracking-tighter text-gray-900 mb-4">מעקב משלוחים</h1>
                    <p className="text-gray-500 font-medium">הזן את מספר ההזמנה שקיבלת באישור הרכישה</p>
                </div>

                {/* טופס חיפוש */}
                <form onSubmit={handleTrack} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 mb-10">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="מספר הזמנה (למשל ASI-12345)"
                                className="w-full py-5 pr-14 pl-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black font-bold"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                required
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white px-10 py-5 rounded-2xl font-black hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "בודק..." : "עקוב אחר הזמנה"}
                        </button>
                    </div>
                </form>

                {/* תצוגת סטטוס (מוצגת רק כשיש תוצאה) */}
                {orderStatus && (
                    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
                        <div className="flex items-center justify-between mb-12 border-b border-gray-50 pb-8">
                            <div>
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">סטטוס הזמנה #{orderId}</span>
                                <h3 className="text-3xl font-black italic tracking-tighter text-gray-900 mt-1">
                                    {steps[currentStepIndex].label}
                                </h3>
                            </div>
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                                {steps[currentStepIndex].icon}
                            </div>
                        </div>

                        {/* ציר זמן ויזואלי */}
                        <div className="relative flex justify-between">
                            {/* קו מחבר */}
                            <div className="absolute top-7 left-0 right-0 h-1 bg-gray-100 -z-0" />
                            <div 
                                className="absolute top-7 right-0 h-1 bg-black transition-all duration-1000 -z-0" 
                                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                            />

                            {steps.map((step, index) => (
                                <div key={step.id} className="relative z-10 flex flex-col items-center group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 ${
                                        index <= currentStepIndex 
                                        ? 'bg-black border-black text-white' 
                                        : 'bg-white border-gray-100 text-gray-300'
                                    }`}>
                                        {step.icon}
                                    </div>
                                    <span className={`mt-4 font-black text-sm ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-300'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 bg-gray-50 rounded-[2rem] p-6 flex items-start gap-4">
                            <div className="bg-white p-3 rounded-xl shadow-sm">
                                <FiMapPin className="text-black" size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">מיקום אחרון:</p>
                                <p className="text-gray-500 text-sm italic">מרכז לוגיסטי - חולון, ישראל</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;