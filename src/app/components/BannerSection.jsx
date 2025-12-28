// src/components/BannerSection.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import {mobilerepair} from '../../assets/index'; 
import {mobileshop} from '../../assets/index'; 
import {PhoneStore} from '../../assets/index'; 


const banners = [
    {
        id: 1,
        title: '',
        subtitle: '',
        link: '/repair-lab',
        image_data: mobilerepair
    },
    {
        id: 2,
        title: '',
        subtitle: '',
        link: '/sale/accessories',
        image_data: mobileshop
    },
    {
        id: 3,
        title: '',
        subtitle: '',
        link: '/trade-in',
        image_data: PhoneStore 
    }
];

export default function BannerSection() {
    return (
        <section className="container mx-auto px-4 my-12" dir="rtl">
            
       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* לולאה על שלושת הבאנרים */}
                {banners.map((banner) => (
                    <Link 
                        key={banner.id}
                        href={banner.link}
                        // הגדרת relative, גובה קבוע, ו-overflow-hidden
                        className="relative block p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden h-65 group"
                    >
                     
                        <Image
                            src={banner.image_data} 
                            alt={banner.title}
                            fill={true} 
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        />

                        {/* 2. שכבת כיסוי כהה (Overlay) כדי שהטקסט יהיה קריא */}
                        <div className="absolute inset-0 rounded-lg group-hover:opacity-20 transition duration-300"></div>

                        {/* 3. תוכן הטקסט (לבן ומונח מעל התמונה והכיסוי) */}
                        <div className="relative z-10 text-white"> 
                            <h3 className="text-2xl font-extrabold mb-1">
                                {banner.title}
                            </h3>
                            <p className="text-base font-medium">
                                {banner.subtitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}