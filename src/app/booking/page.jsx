"use client";

import React, { useState } from 'react';
import { SlScreenSmartphone } from "react-icons/sl";
import { LuDatabaseBackup } from "react-icons/lu";
import { TbBatteryCharging2 } from "react-icons/tb";
import { CgSoftwareDownload } from "react-icons/cg";
import { FiBatteryCharging, FiX, FiChevronLeft } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";

const services = [
    { 
        id: 'screen', 
        title: 'תיקון מסך', 
        description: 'החלפת מסך מקצועית לכל סוגי המכשירים.', 
        icon: <SlScreenSmartphone size={24} />, 
        duration: 'כ-20 דקות' 
    },
    { 
        id: 'data', 
        title: 'גיבוי ושחזור מידע', 
        description: 'שמירה ושחזור מידע בצורה בטוחה ודיסקרטית.', 
        icon: <LuDatabaseBackup size={24} />, 
        duration: 'בהתאם לנפח' 
    },
    { 
        id: 'charging', 
        title: 'החלפת שקע טעינה', 
        description: 'תיקון תחת מיקרוסקופ ובהלחמה מדויקת.', 
        icon: <TbBatteryCharging2 size={24} />, 
        duration: 'כ-60 דקות' 
    },
    { 
        id: 'software', 
        title: 'עדכוני תוכנה', 
        description: 'שדרוג גרסה ופתרון תקלות תוכנה מתקדמות.', 
        icon: <CgSoftwareDownload size={24} />, 
        duration: 'כ-30 דקות' 
    },
    { 
        id: 'battery', 
        title: 'החלפת סוללה', 
        description: 'כולל אטימה מחדש בדבקים מקוריים.', 
        icon: <FiBatteryCharging size={24} />, 
        duration: 'כ-15 דקות' 
    },
    { 
        id: 'camera', 
        title: 'החלפת מצלמה', 
        description: 'החלפת עדשות וניקוי חיישנים למראה חד.', 
        icon: <CiCamera size={26} />, 
        duration: 'כ-45 דקות' 
    }
];

export default function BookingPage() {
    const [isIframeOpen, setIsIframeOpen] = useState(false);

    // חובה להחליף את זה בקישור האמיתי שלך מ"קבענו"
    const KEBANO_URL = "https://kebano.com"; 

    return (
        <div className="min-h-screen bg-[#fcfcfc] py-12 px-4" dir="rtl" style={{ color: 'black' }}>
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl mb-4 text-black">קביעת תור - אסי מובייל</h1>
                    <p className="text-gray-500 text-lg">בחר את השירות המבוקש לתיקון המכשיר</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                        <div 
                            key={service.id}
                            onClick={() => setIsIframeOpen(true)}
                            className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-black transition-all cursor-pointer group flex flex-col items-start text-right"
                        >
                            <div className="w-full flex justify-between items-center mb-6">
                                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                                    {service.icon}
                                </div>
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                                    {service.duration}
                                </span>
                            </div>
                            <h3 className="text-xl text-black mb-2">{service.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                            <div className="mt-auto flex items-center text-black font-medium text-sm group-hover:gap-2 transition-all">
                                לקביעת תור <FiChevronLeft className="mr-1" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* חלון ה-Iframe (קופץ בלחיצה) */}
                {isIframeOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                        <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] overflow-hidden h-[85vh] shadow-2xl">
                            <button 
                                onClick={() => setIsIframeOpen(false)}
                                className="absolute top-5 left-5 p-3 bg-white/90 shadow-lg rounded-full hover:bg-red-50 hover:text-red-500 z-[110] transition-all"
                            >
                                <FiX size={24} />
                            </button>

                            <iframe 
                                src={KEBANO_URL}
                                className="w-full h-full border-none"
                                title="מערכת קביעת תורים"
                                allow="payment; geolocation"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}