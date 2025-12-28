// src/app/components/Carousel.jsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import {iPhone17new, repairbanner} from '../../assets/index';

const slides = [
    {
    id: 1,
    title: "באנר 1",
    buttonLink: "/store?category=gaming",
    imageUrl: iPhone17new, 
    altText: "תמונה 1 של מוצר משני",
  },
  {
    id: 2,
    title: "באנר 2",
    buttonLink: "/store?category=gaming",
    imageUrl: repairbanner, 
    altText: "תמונה 2 של מוצר משני",
  },
];

const Carousel = ({ autoSlide = true, autoSlideInterval = 5000 }) => {
  const [curr, setCurr] = useState(0); 

  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, []);

  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);
  
  return (
    // תיקון: הסרתי את ה-absolute מהקונטיינר הראשי כדי שיזרום נכון במסמך
    // הוספתי w-full כדי שימלא את המסך הקטן
    <section dir='ltr' className="w-full max-w-[1905px] mx-auto relative overflow-hidden group">
      <div 
        className="flex transition-transform ease-out duration-700 h-[200px] sm:h-[400px] md:h-[450px] lg:h-[523px]"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((s) => (
          <div 
            key={s.id} 
            className="w-full flex-shrink-0 relative"
          >      
            <Image
              src={s.imageUrl}
              alt={s.altText}
              fill={true}
              priority={curr === 0}
              className="object-cover w-full h-full block" 
              sizes="100vw" // עוזר ל-Next.js לבצע אופטימיזציה למובייל
            />
            
            {s.buttonLink && (
              <Link href={s.buttonLink} className="absolute inset-0 z-10 cursor-pointer" aria-label={s.title}></Link>
            )}
          </div>
        ))}
      </div>

      {/* נקודות ניווט (Dots) - מוקטנות מעט למובייל */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurr(i)} className="cursor-pointer p-1.5 sm:p-2">
              <div 
                className={`transition-all h-1.5 sm:h-2.5 rounded-full ${
                  curr === i ? "bg-white w-6 sm:w-8" : "bg-white/50 hover:bg-white w-1.5 sm:w-2.5"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;