"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { supabase } from '../../lib/supabase';
import { FiMail, FiLock, FiAlertTriangle, FiUserPlus, FiLogIn, FiX } from 'react-icons/fi'; 

const AuthModal = ({ isVisible, onClose }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isVisible]);

    if (!mounted || !isVisible) return null;

    // עידון גבהים וריווחים למובייל לעומת דסקטופ
    const inputClass = "w-full py-3 sm:py-4 pr-11 pl-4 bg-gray-50 border border-gray-100 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-black text-right transition-all placeholder-gray-400 text-sm";
    const iconWrapperClass = "absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400";

    return createPortal(
        <div className="fixed inset-0 z-[100000] flex items-end sm:items-stretch sm:justify-end" dir="rtl">
            {/* רקע כהה */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
                onClick={onClose}
            />
            
            {/* גוף המודאל */}
            <div 
                className={`
                    relative bg-white shadow-2xl flex flex-col transition-all duration-500 ease-out
                    
                    /* מובייל: תופס חצי מסך (60%), פינות מעוגלות */
                    w-full h-[65vh] rounded-t-[24px] 
                    ${isVisible ? 'translate-y-0' : 'translate-y-full'}

                    /* דסקטופ: חוזר לסידבר רגיל */
                    sm:h-full sm:w-[420px] sm:rounded-none sm:translate-y-0
                    sm:${isVisible ? 'translate-x-0' : 'translate-x-full'}
                `}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* ידית גרירה עיצובית - קטנה יותר */}
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 sm:hidden" />

                {/* כותרת - הקטנת ריווחים במובייל */}
                <div className="p-5 sm:p-8 border-b border-gray-50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl sm:text-3xl font-black italic tracking-tighter text-gray-900 leading-none">
                            {isLoginMode ? 'כניסה' : 'הרשמה'}
                        </h2>
                        <p className="text-gray-400 text-[9px] font-bold mt-1 uppercase tracking-widest">ASI MOBILE OFFICIAL</p>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                        <FiX size={22} />
                    </button>
                </div>

                {/* גוף הטופס - הקטנת Space-y ל-4 במקום 6 */}
                <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-4 sm:space-y-6">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-3 sm:space-y-4">
                        <div className="relative">
                            <input type="email" placeholder="כתובת אימייל" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
                            <FiMail className={iconWrapperClass} size={18} />
                        </div>
                        <div className="relative">
                            <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
                            <FiLock className={iconWrapperClass} size={18} />
                        </div>
                        
                        {/* כפתור כניסה - פחות Padding במובייל */}
                        <button className="w-full bg-black text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-2">
                            {isLoginMode ? <FiLogIn size={18} /> : <FiUserPlus size={18} />}
                            <span>{isLoginMode ? 'כניסה למערכת' : 'צור חשבון'}</span>
                        </button>
                    </form>

                    <button 
                        className="w-full text-center text-xs sm:text-sm font-bold text-gray-500 py-2"
                        onClick={() => setIsLoginMode(!isLoginMode)}
                    >
                        {isLoginMode ? 'עדיין אין לך חשבון? הרשם' : 'כבר רשום? התחבר'}
                    </button>
                </div>

                {/* פוטר קטן יותר */}
                <div className="p-4 sm:p-8 border-t border-gray-50 bg-gray-50/50">
                    <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-[0.1em]">
                        Secure Encryption SSL 256-bit
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AuthModal;