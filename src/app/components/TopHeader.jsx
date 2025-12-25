import React from 'react';
import { MapPin, Phone, Clock, Truck, Instagram, Facebook, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const TopHeader = () => {
  return (
    /* הוספתי hidden - זה אומר שהרכיב מוסתר כברירת מחדל (מובייל) */
    /* הוספתי md:block - זה אומר שממסך בינוני (Tablet/Desktop) הוא יחזור להופיע */
    <div className="hidden md:block w-full bg-[#000] text-white py-2.5 text-[13px] font-sans border-b border-white/10">
      <div className="max-w-8xl mx-auto px-6 flex justify-between items-center" dir="rtl">
        
        {/* צד ימין: כתובת, טלפון ושעות פעילות */}
        <div className="flex items-center relative -left-15 gap-6">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-white" />
            <span>רחוב המובייל 12, תל אביב</span>
          </div>

          <div className="flex items-center gap-2 border-r border-white/20 pr-6">
            <Phone size={15} className="text-white" />
            <span dir="ltr">03-1234567</span>
          </div>

          <div className="flex items-center gap-2 border-r border-white/20 pr-6">
            <Clock size={15} className="text-white" />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-white">א'-ה':</span>
                <span className="font-medium">09:00-19:00</span>
              </div>
              <div className="flex items-center gap-1 border-r border-white/20 pr-6">
                <span className="text-white">ו' וערבי חג:</span>
                <span className="font-medium">09:00-13:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* צד שמאל: מעקב משלוחים ומדיה חברתית */}
        <div className="flex items-center gap-6 relative -right-15" dir="ltr">
          <div className="flex items-center gap-4 border-r border-white/20 pr-6">
            <a href="#" className="hover:text-gray-400 transition-all hover:scale-110">
              <Instagram size={16} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-all hover:scale-110">
              <Facebook size={16} />
            </a>
            <a href="#" className="hover:text-gray-400 transition-all hover:scale-110">
              <MessageCircle size={16} />
            </a>
          </div>

          <Link 
            href="/track-order" 
            className="flex items-center gap-2 hover:text-gray-400 transition-colors group"
          >
            <span className="font-bold text-sm">מעקב משלוחים</span>
            <Truck size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default TopHeader;