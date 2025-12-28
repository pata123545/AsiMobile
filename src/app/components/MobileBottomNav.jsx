"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiShoppingBag, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';
import AuthModal from './AuthModal'; // ייבוא המודאל
import ProfileSettings from './ProfileSettings'; // ייבוא הפרופיל

const MobileBottomNav = () => {
    const pathname = usePathname();
    const { totalItems, openCartSidebar } = useCart();
    
    // לוגיקת משתמש בתוך הניווט התחתון
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });
        return () => authListener?.subscription.unsubscribe();
    }, []);

    const handleUserClick = () => {
        if (user) {
            setIsProfileModalOpen(true);
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const navItems = [
        { label: 'בית', icon: <FiHome size={24} />, href: '/' },
        { label: 'חנות', icon: <FiShoppingBag size={24} />, href: '/store' },
        { label: 'עגלה', icon: <FiShoppingCart size={24} />, onClick: openCartSidebar, isCart: true },
        { label: 'אהבתי', icon: <FiHeart size={24} />, href: '/favorites' },
        { label: 'פרופיל', icon: <FiUser size={24} />, onClick: handleUserClick },
    ];

    return (
        <>
            <div className="md:hidden fixed bottom-5 left-4 right-4 z-[1000]" dir="rtl">
                <nav className="bg-white/90 backdrop-blur-md border border-gray-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[28px] h-18 py-2 px-3 flex justify-around items-center">
                    {navItems.map((item, idx) => {
                        const isActive = pathname === item.href;
                        
                        const content = (
                            <div className={`relative flex flex-col items-center justify-center transition-all duration-300 gap-1 ${isActive ? 'scale-110' : 'scale-100'}`}>
                                {isActive && (
                                    <div className="absolute -inset-2 bg-blue-50 rounded-2xl -z-10 animate-in fade-in zoom-in duration-300" />
                                )}
                                <div className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {item.icon}
                                </div>
                                {item.isCart && totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                                        {totalItems}
                                    </span>
                                )}
                                <span className={`text-[10px] font-bold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {item.label}
                                </span>
                            </div>
                        );

                        return item.onClick ? (
                            <button key={idx} onClick={item.onClick} className="flex-1 flex justify-center outline-none">
                                {content}
                            </button>
                        ) : (
                            <Link key={idx} href={item.href} className="flex-1 flex justify-center">
                                {content}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* המודאלים שיוצגו כשלוחצים על "פרופיל" למטה */}
            <AuthModal 
                isVisible={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
            {user && (
                <ProfileSettings 
                    isVisible={isProfileModalOpen} 
                    onClose={() => setIsProfileModalOpen(false)} 
                    user={user} 
                />
            )}
        </>
    );
};

export default MobileBottomNav;