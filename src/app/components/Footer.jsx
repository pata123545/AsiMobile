"use client";

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaYoutube, FaTiktok, FaInstagram, FaWhatsapp, FaEnvelope, FaClock, FaHeadset, FaStore, FaFileInvoiceDollar, FaRegCommentDots } from 'react-icons/fa';
import { SiGoogleplay, SiAppstore } from 'react-icons/si';
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
    return (
        <footer  className="w-full bg-[#dfdede] text-right" dir="ltr">
            {/* חלק עליון - הרשמה לתפוצה */}
            <div dir='rtl' className="bg-[#f0f0f0] py-10 px-4 border-b border-gray-100">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-2">הצטרפות לתפוצה שלנו!</h2>
                    <p className="text-md text-gray-700 mb-6 max-w-2xl mx-auto font-medium">
                    לקוחות שרשומים לתפוצה שלנו מקבלים לפני כולם התראות על מבצעים בלעדיים, מוצרים חדשים, מוצרים שחזרו למלאי והטבות שוות במיוחד!
רוצה גם לקבל עדכונים מאיתנו ?
                        <br /> 
                    </p>
                    <div dir='rtl' className="flex max-w-md mx-auto border-2 border-black rounded-full overflow-hidden">
                      <input 
                            type="text" 
                            placeholder="פלאפון נייד עם וואצאפ" 
                            className="flex-1 px-6 py-3 outline-none text-right placeholder:text-gray-400"
                        />
                        <button  className="bg-black text-white px-8 py-2 font-bold hover:bg-gray-800 transition-colors border-r border-black">
                            הצטרפות
                        </button>
                    </div>
                </div>
            </div>

            {/* חלק תחתון - עמודות המידע */}
            <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* עמודה 1: עקבו אחרינו והאפליקציה */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-bold mb-4">עקבו אחרינו</h3>
                    <div className="flex gap-3 mb-8">
                        <FaFacebook size={35} className="text-[#1877F2] cursor-pointer" />
                        <FaYoutube size={35} className="text-[#FF0000] cursor-pointer" />
                        <FaTiktok size={35} className="text-black cursor-pointer" />
                        <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg p-1">
                            <FaInstagram size={27} className="text-white cursor-pointer" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4"></h3>
                    <div className="flex gap-2">
                            
            
                    </div>
                </div>

                {/* עמודה 2: לינקים באתר */}
                <div className="text-center md:text-right">
                    <h3 className="text-xl font-bold mb-4">לינקים באתר</h3>
                    <ul className="space-y-1 text-sm text-gray-600 font-medium">
                        <li><Link href="#" className="hover:underline">אודותינו</Link></li>
                        <li><Link href="#" className="hover:underline">שאלות ותשובות</Link></li>
                        <li><Link href="#" className="hover:underline">צור קשר</Link></li>
                        <li><Link href="#" className="hover:underline">בדיקת אחריות למוצרי יבואן מקביל</Link></li>
                        <li><Link href="#" className="hover:underline text-blue-600">הצהרת נגישות</Link></li>
                        <li><Link href="#" className="hover:underline">מדיניות משלוחים</Link></li>
                        <li><Link href="#" className="hover:underline">מדיניות פרטיות</Link></li>
                        <li><Link href="#" className="hover:underline">מדיניות עוגיות</Link></li>
                        <li><Link href="#" className="hover:underline">תקנון</Link></li>
                        <li><Link href="#" className="hover:underline">תקנון החזרות, זיכויים והחלפות</Link></li>
                    </ul>
                </div>

                {/* עמודה 3: יצירת קשר */}
                <div className="flex flex-col items-center md:items-end space-y-3">
                    <h3 className="text-xl font-bold mb-2">יצירת קשר</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span>asimobileweb@gmail.com</span>
                        <FaEnvelope className="text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2 text-sm italic">
                        <span>השופטים 26, חולון</span>
                        <IoLocationSharp className="text-sky-400 text-lg" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>תמיכה טכנית</span>
                        <FaWhatsapp className="text-green-500 text-lg" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>חנות</span>
                        <FaWhatsapp className="text-green-500 text-lg" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span>השאירו לנו הודעה</span>
                        <FaRegCommentDots className="text-gray-400 text-lg" />
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <span>ראשון עד חמישי: 09:00 - 20:00</span>
                        <FaClock className="text-gray-800" />
                    </div>
                </div>
            </div>

            {/* כפתור נגישות צף בצד */}
            
        </footer>
    );
};

export default Footer;