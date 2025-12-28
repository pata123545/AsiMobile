"use client";

import React from 'react';
import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi';

const LocationMap = () => {
    // כתובת המעבדה שלך
    const address = "העצמאות 52, קרית אתא";

    return (
        /* תיקון קריטי: הסרתי את ה-relative, ה-left והרוחב הקבוע. הוספתי container ומרכוז */
        <div className="container mx-auto px-4 mb-20" dir="rtl">
            <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* צד המפה */}
                    <div className="h-[300px] md:h-auto w-full bg-gray-100 min-h-[300px]">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0, minHeight: "350px" }}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            allowFullScreen
                            title="מפת הגעה"
                        ></iframe>
                    </div>

                    {/* צד פרטי קשר */}
                    <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">איפה אנחנו נמצאים?</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-black">
                                    <FiMapPin size={22} />
                                </div>
                                <div>
                                    <p className="font-bold text-black">כתובת</p>
                                    <p className="text-gray-600">{address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-black">
                                    <FiPhone size={22} />
                                </div>
                                <div>
                                    <p className="font-bold text-black">טלפון</p>
                                    <p className="text-gray-600" dir="ltr">04-811-3332</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-black">
                                    <FiClock size={22} />
                                </div>
                                <div>
                                    <p className="font-bold text-black">שעות פעילות</p>
                                    <div className="text-gray-600 text-sm mt-1">
                                        <p>א' - ה': 09:00 - 19:00</p>
                                        <p>ו': 09:00 - 14:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 inline-block bg-black text-white text-center py-4 px-6 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-md"
                        >
                            נווטו אלינו ב-Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationMap;