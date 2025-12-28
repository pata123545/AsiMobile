"use client";

import React, { useState } from 'react';
import { FiPhone, FiMail, FiSend, FiCheckCircle, FiLoader } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { supabase } from '../../lib/supabase'; 
import emailjs from '@emailjs/browser';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | success | error

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    const formData = new FormData(e.target);
    const data = {
        full_name: formData.get('fullName'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
    };

    try {
        // 1. שמירה בסופבייס (כדי שיהיה לך גיבוי)
        const { error: sbError } = await supabase
            .from('contact_leads')
            .insert([data]);

        if (sbError) throw sbError;

        // 2. שליחת מייל אליך
        await emailjs.send(
            'service_w8gpm0n',   // תחליף ב-ID שלך
            'template_1omqqd8',  // תחליף ב-ID שלך
            {
                full_name: data.full_name,
                phone: data.phone,
                subject: data.subject,
                message: data.message,
            },
            'iEzwpRmG6FGYhfqDJ'    // תחליף ב-Key שלך
        );

        setLoading(false);
        setStatus('success');
        e.target.reset();
    } catch (error) {
        console.error("Error:", error);
        setLoading(false);
        setStatus('error');
    }
};
    return (
        <div className="min-h-screen bg-white text-[#1d1d1f] font-sans" dir="rtl">
            <div className="max-w-5xl mx-auto px-6 py-20">
                
                {/* כותרת עדינה */}
                <div className="mb-20 text-right">
                    <h1 className="text-5xl font-light tracking-tight mb-4 italic">צור קשר.</h1>
                    <p className="text-lg text-black max-w-xl font-light">
                        אנחנו זמינים לכל שאלה טכנית, ייעוץ לפני תיקון או בירור מצב מכשיר במעבדה.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* עמודה 1: פרטי התקשרות */}
                    <div className="lg:col-span-4 space-y-12">
                        <section>
                            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-semibold">פרטי התקשרות</h3>
                            <div className="space-y-6">
                                <a href="tel:04-811-3332" className="group flex items-center gap-4 text-lg hover:text-gray-500 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                        <FiPhone size={18} />
                                    </div>
                                    <span dir="ltr">04-811-3332</span>
                                </a>
                                <a href="https://wa.me/972500000000" className="group flex items-center gap-4 text-lg hover:text-green-600 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                        <FaWhatsapp size={18} className="text-black" />
                                    </div>
                                    <span>WhatsApp</span>
                                </a>
                                <div className="flex items-center gap-4 text-lg">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                        <FiMail size={18} />
                                    </div>
                                    <span className="text-base text-black">asimobileweb@gmail.com</span>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-semibold">שעות מעבדה</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span>א' - ה'</span>
                                    <span className="font-medium text-black">19:00 - 09:00</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span>יום ו'</span>
                                    <span className="font-medium text-black">14:00 - 09:00</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span className="text-black">יום שבת</span>
                                    <span className="text-black">סגור</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* עמודה 2: טופס פעיל */}
                    <div className="lg:col-span-8">
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center bg-gray-50 rounded-3xl p-12 text-center animate-in fade-in zoom-in duration-300">
                                <FiCheckCircle size={48} className="text-green-500 mb-4" />
                                <h2 className="text-2xl font-light mb-2">ההודעה נשלחה!</h2>
                                <p className="text-gray-500 mb-6">נחזור אליך בהקדם האפשרי.</p>
                                <button onClick={() => setStatus('idle')} className="text-sm font-bold border-b border-black pb-1">שלח הודעה נוספת</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                <div className="relative group">
                                    <label className="text-[11px] font-bold text-black uppercase mr-1">שם מלא</label>
                                    <input name="fullName" required type="text" className="w-full py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors placeholder:text-gray-300" placeholder="ישראל ישראלי" />
                                </div>
                                <div className="relative group">
                                    <label className="text-[11px] font-bold text-black uppercase mr-1">מספר טלפון</label>
                                    <input name="phone" required type="tel" className="w-full py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors text-right placeholder:text-gray-300" placeholder="050-0000000" />
                                </div>
                                <div className="md:col-span-2 relative group">
                                    <label className="text-[11px] font-bold text-black uppercase mr-1">נושא הפנייה</label>
                                    <input name="subject" required type="text" className="w-full py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors placeholder:text-gray-300" placeholder="למשל: החלפת סוללה לאייפון 13" />
                                </div>
                                <div className="md:col-span-2 relative group">
                                    <label className="text-[11px] font-bold text-black uppercase mr-1">הודעה</label>
                                    <textarea name="message" rows="3" className="w-full py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors resize-none placeholder:text-gray-300" placeholder="איך נוכל לעזור?"></textarea>
                                </div>
                                
                                {status === 'error' && <p className="text-red-500 text-xs md:col-span-2">שגיאה בשליחה. נסה שוב או פנה בוואטסאפ.</p>}

                                <div className="md:col-span-2 flex justify-start pt-6">
                                    <button 
                                        disabled={loading}
                                        type="submit" 
                                        className="bg-[#1d1d1f] text-white px-12 py-3 rounded-full text-sm font-medium hover:bg-black transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {loading ? <FiLoader className="animate-spin" /> : <FiSend className="rotate-180" />}
                                        {loading ? 'שולח...' : 'שלח הודעה'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}