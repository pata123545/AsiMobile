// src/components/RepairServiceBanner.jsx

import Link from 'next/link';

export default function RepairServiceBanner() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700 text-white">
            <div className="container mx-auto max-w-7xl text-center">
                
                <h2 className="text-4xl font-extrabold mb-4">
                    🛠️ שירות מעבדת תיקונים במקום
                </h2>
                <p className="text-xl mb-8 opacity-90">
                    תיקון מהיר ומקצועי לכל סוגי המכשירים הסלולריים והטאבלטים  אצלנו בחנות!
                </p>
                
                <Link 
                    href="/contact" // ⬅️ שנה לנתיב המתאים בדף יצירת הקשר או מידע על המעבדה
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 shadow-lg transition duration-300"
                >
                    צרו קשר לתיאום תיקון מיידי
                </Link>
            </div>
        </section>
    );
}