import React from 'react';
import Image from 'next/image';
import FeaturedProducts from './components/FeaturedProducts';
import Carousel from './components/Carousel';
import CategorySection from './components/CategorySection';
import BannerSection from './components/BannerSection';
import RepairLabSection from './components/RepairLabSection';
import LocationMap from './components/LocationMap';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

export default function Home() {
  return (
    // שימוש ב-min-h-screen מבטיח שהרקע יכסה את כל גובה המסך
    <div className="min-h-screen bg-[#f7f7f7] font-sans dark:bg-black transition-colors duration-300">
      
      {/* הוספנו max-w-screen-2xl כדי שהאתר לא יתפרס יותר מדי במסכי ענק */}
      {/* הוספנו mx-auto כדי למרכז את כל התוכן */}
      <main className="w-full max-w-[1920px] mx-auto overflow-x-hidden">
        
        {/* סקשן קרוסלה - בדרך כלל תופס רוחב מלא */}
        <Carousel />

        {/* שאר הסקשנים צריכים "אוויר" בצדדים במובייל */}
        {/* נשתמש ב-padding אחיד לכל התוכן המרכזי */}
        <div className="space-y-12 sm:space-y-16 md:space-y-24 pb-20">
          
          <section className="px-4 sm:px-6 lg:px-8">
            <CategorySection /> 
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <FeaturedProducts categoryName="מכשירי סלולר" />
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <FeaturedProducts categoryName="אייפדים וטאבלטים" />
          </section>

          {/* באנר לרוב ברוחב מלא, אז לא ניתן לו padding */}
          <BannerSection />

          <section className="px-4 sm:px-6 lg:px-8">
            <FeaturedProducts categoryName="שרות מעבדת תיקונים במקום" />
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <FeaturedProducts categoryName="מגינים לאייפון" />
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <RepairLabSection />
          </section>

          {/* מפה וביקורות */}
          <section className="px-4 sm:px-6 lg:px-8">
            <LocationMap />
          </section>

          <section className="px-4 sm:px-6 lg:px-8">
            <Reviews />
          </section>

        </div>

        <Footer />
      </main>
    </div>
  );
}