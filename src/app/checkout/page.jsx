"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext'; 
import toast from 'react-hot-toast';
import { FiLock, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const CheckoutPage = () => {
    const cartContext = useCart();
    const cart = cartContext?.cart || [];
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const [localTotal, setLocalTotal] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        city: '',
        address: '',
        notes: ''
    });

    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true);
        if (cart && cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
            setLocalTotal(total);
        }
    }, [cart]);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    toast.error("יש להתחבר כדי להשלים רכישה");
                    router.push('/login?redirect=/checkout');
                } else {
                    setUser(user);
                    setFormData(prev => ({
                        ...prev,
                        fullName: user.user_metadata?.full_name || user.user_metadata?.name || '',
                        email: user.email || '',
                        phone: user.user_metadata?.phone || '' 
                    }));
                    setLoading(false);
                }
            } catch (error) {
                console.error("שגיאת אימות:", error);
                setLoading(false);
            }
        };
        checkUser();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitOrder = async (e) => {
        if (e) e.preventDefault();
        if (!formData.fullName || !formData.phone || !formData.address) {
            toast.error("אנא מלא את כל פרטי החובה");
            return;
        }
        if (cart.length === 0) {
            toast.error("הסל שלך ריק");
            return;
        }

        setIsSubmitting(true);
        const orderNumber = `ASI-${Math.floor(100000 + Math.random() * 900000)}`;

        try {
            const { error: dbError } = await supabase
                .from('orders')
                .insert([{
                    order_number: orderNumber,
                    user_id: user.id,
                    email: user.email,
                    total_price: localTotal,
                    status: 'pending_payment',
                    shipping_details: formData,
                    items: cart
                }]);

            if (dbError) throw dbError;

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: localTotal,
                    orderId: orderNumber,
                    fullName: formData.fullName,
                    email: user.email,
                    phone: formData.phone
                })
            });

            const data = await response.json();
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                throw new Error(data.error || "לא ניתן היה לייצר קישור לתשלום");
            }
        } catch (error) {
            toast.error("שגיאה: " + error.message);
            setIsSubmitting(false);
        }
    };

    if (loading || !isHydrated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <FiLock className="animate-pulse text-black mx-auto mb-4" size={40} />
                    <p className="text-sm text-gray-400">מאבטח חיבור...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 md:px-8" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <header className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl text-black">קופה</h1>
                    <Link href="/" className="text-sm flex items-center gap-1 text-gray-400 hover:text-black transition-colors">
                        חזרה לחנות <FiChevronRight />
                    </Link>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* צד ימין: טופס */}
                    <div className="lg:col-span-7 space-y-8">
                        <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                                <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">1</span>
                                <h2 className="text-xl text-black">פרטי משלוח</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs tracking-wide text-gray-400 block mr-1">שם מלא</label>
                                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-black text-black" placeholder="ישראל ישראלי" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-wide text-gray-400 block mr-1">טלפון</label>
                                    <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-black text-black" placeholder="050-0000000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-wide text-gray-400 block mr-1">עיר</label>
                                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-black text-black" placeholder="תל אביב" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs tracking-wide text-gray-400 block mr-1">כתובת</label>
                                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-1 focus:ring-black text-black" placeholder="רחוב ומספר בית" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* צד שמאל: סיכום הזמנה */}
                    <div className="lg:col-span-5">
                        <div className="bg-white p-8 rounded-2xl sticky top-8 shadow-xl border border-gray-50">
                            <h2 className="text-xl mb-8 text-black border-b border-gray-50 pb-4">סיכום הזמנה</h2>
                            
                            <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                {cart.length > 0 ? (
                                    cart.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start gap-4 border-b border-gray-50 pb-4">
                                            <div className="flex gap-3 flex-1">
                                                <span className="text-gray-400 shrink-0">x{item.quantity}</span>
                                                <span className="text-black leading-tight text-sm">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="shrink-0 text-black text-sm">
                                                ₪{(Number(item.price) * Number(item.quantity)).toLocaleString()}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">הסל ריק</p>
                                )}
                            </div>

                            <div className="space-y-4 border-t border-gray-100 pt-6">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>משלוח</span>
                                    <span className="text-green-600">חינם</span>
                                </div>
                                <div className="flex justify-between text-2xl pt-2 text-black">
                                    <span>סה"כ לתשלום</span>
                                    <span>₪{localTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleSubmitOrder}
                                disabled={isSubmitting || cart.length === 0}
                                className="w-full bg-black text-white py-5 rounded-xl text-lg mt-10 hover:bg-gray-800 transition-all active:scale-98 disabled:bg-gray-100 disabled:text-gray-400"
                            >
                                {isSubmitting ? 'מעבד...' : 'מעבר לתשלום'}
                            </button>
                            
                            <p className="text-[10px] text-center mt-4 text-gray-400 flex items-center justify-center gap-1">
                                <FiLock /> תשלום מאובטח בתקן SSL
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;