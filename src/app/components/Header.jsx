"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
    FiUser, FiShoppingCart, FiLoader, FiHeart, FiMenu, FiX, 
    FiTruck, FiSmartphone, FiTool, FiPhone, FiHome 
} from 'react-icons/fi';
import { MdAccessibilityNew } from 'react-icons/md'; 
import { FaWhatsapp } from 'react-icons/fa'; 
import AuthModal from './AuthModal';
import ProfileSettings from './ProfileSettings';
import { useWishlist } from '../../context/WishlistContext';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext'; 
import { logo } from "../../assets/index";

const Header = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites } = useWishlist();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // סטייט לתפריט המובייל
    const { totalItems, openCartSidebar } = useCart();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        checkUser();
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });
        return () => authListener?.subscription.unsubscribe();
    }, []);

    const menuLinks = [
        { label: 'עמוד הבית', href: '/', icon: <FiHome size={20} /> },
        { label: 'חנות מוצרים', href: '/store', icon: <FiSmartphone size={20} /> },
        { label: 'תיקון במעבדה', href: '/booking', icon: <FiTool size={20} /> },
        { label: 'מעקב משלוחים', href: '/track-order', icon: <FiTruck size={20} /> },
        { label: 'צור קשר', href: '/contact', icon: <FiPhone size={20} /> },
    ];

    if (loading) return (
        <header className="bg-white relative h-16 sm:h-20 flex items-center justify-center border-b border-gray-100">
            <FiLoader className="animate-spin text-blue-600" size={25} />
        </header>
    );

    return (
        <>
            <button className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-[999] bg-blue-600 text-white p-2 rounded-r-xl shadow-xl">
                <MdAccessibilityNew size={22} />
            </button>

            <a href="https://wa.me/..." className="fixed bottom-24 right-6 z-[99] bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl md:bottom-8">
                <FaWhatsapp size={24} />
            </a>

            {/* Header: Relative במובייל (נעלם בגלילה) */}
            <header className="bg-white relative md:sticky top-0 z-50 border-b border-gray-100 shadow-sm" dir="rtl">
                <div className="max-w-[1400px] mx-auto px-4 h-16 sm:h-20 flex items-center justify-between relative">
                    
                    {/* המבורגר למובייל - בצד ימין */}
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        <FiMenu size={26} />
                    </button>

                    {/* לוגו: ממורכז במובייל */}
                    <div className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                        <Link href="/" className="flex-shrink-0">
                            <Image className="w-20 sm:w-28 md:w-36 object-contain" src={logo} alt="Asi Mobile" priority />
                        </Link>
                    </div>

                    {/* ניווט Desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        {menuLinks.map((link, idx) => (
                            <Link key={idx} href={link.href} className="text-[17px] font-medium text-black hover:text-blue-600 transition-colors relative group">
                                {link.label}
                                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* אייקונים Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/favorites" className="p-2 relative"><FiHeart size={23} /></Link>
                        <button onClick={openCartSidebar} className="p-2 relative">
                            <FiShoppingCart size={23} />
                            {totalItems > 0 && <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
                        </button>
                        <button onClick={() => user ? setIsProfileModalOpen(true) : setIsAuthModalOpen(true)} className="p-2"><FiUser size={23} /></button>
                    </div>

                    {/* פלייסהולדר לאיזון הלוגו במובייל */}
                    <div className="md:hidden w-10"></div>
                </div>
            </header>

            {/* --- Mobile Drawer Menu --- */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[110000] md:hidden" dir="rtl">
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsMenuOpen(false)} />
                    
                    {/* Drawer Content */}
                    <div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <span className="font-black italic text-xl tracking-tighter">ASI MOBILE</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500">
                                <FiX size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                            {menuLinks.map((link, idx) => (
                                <Link 
                                    key={idx} 
                                    href={link.href} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all group"
                                >
                                    <span className="text-gray-400 group-hover:text-blue-600 transition-colors">{link.icon}</span>
                                    <span className="font-bold text-gray-700 group-hover:text-black">{link.label}</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-400">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">חנות ומעבדה פעילה</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AuthModal isVisible={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            {user && <ProfileSettings isVisible={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} user={user} />}
        </>
    );
};

export default Header;