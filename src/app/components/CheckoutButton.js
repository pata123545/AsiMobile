"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiLock, FiArrowLeft } from 'react-icons/fi';
import AuthModal from './AuthModal'; // וודא שהנתיב לקובץ נכון

const CheckoutButton = ({ cartItemsCount = 0 }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // המשתנה ששולט במודאל
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user: authUser } } = await supabase.auth.getUser();
            setUser(authUser);
            setLoading(false);
        };
        checkUser();
        
        // האזנה לשינויים בהתחברות (אם המשתמש התחבר כרגע)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleCheckoutClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast("יש להתחבר למערכת כדי להשלים את הרכישה", {
                icon: '🔒',
                style: {
                    borderRadius: '12px',
                    background: '#000',
                    color: '#fff',
                    padding: '16px',
                    fontWeight: 'bold',
                },
            });
            setIsAuthModalOpen(true); // פותח את המודאל באופן אוטומטי כשלוחצים על תשלום
            return;
        }
        router.push('/checkout');
    };

    if (loading) return (
        <div className="w-full h-16 bg-gray-100 animate-pulse rounded-2xl"></div>
    );

    return (
        <>
            <div className="w-full space-y-4">
                {/* כפתור התחברות שמופיע רק אם לא מחובר */}
                {!user && (
                    <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="w-full text-center text-[14px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-8"
                    >
                        לחץ כאן להתחברות / הרשמה
                    </button>
                )}

                <button 
                    onClick={handleCheckoutClick}
                    disabled={cartItemsCount === 0}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.1em] transition-all flex items-center justify-center gap-3 shadow-xl ${
                        !user 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale' 
                        : 'bg-black text-white hover:bg-gray-800 active:scale-95 hover:shadow-2xl'
                    } ${cartItemsCount === 0 ? 'opacity-50' : 'opacity-100'}`}
                >
                    <FiLock size={18} className={user ? 'text-green-400' : ''} />
                    <span>המשך לתשלום מאובטח</span>
                    <FiArrowLeft className="mr-2" />
                </button>
            </div>

            {/* הצגת המודאל וניהול הסגירה שלו */}
            <AuthModal 
                isVisible={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
        </>
    );
};

export default CheckoutButton;