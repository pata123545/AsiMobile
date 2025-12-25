// src/app/components/CategorySection.jsx
import { fetchCategoriesWithImages } from '../../lib/data';
import Link from 'next/link';
import Image from 'next/image';

const CategorySection = async () => {
    const categories = await fetchCategoriesWithImages();
    
    // הכתובת המעודכנת עם ה-Bucket הנכון: category-icons
    const STORAGE_BASE = "https://ofyisfpasttzyzanmkxo.supabase.co/storage/v1/object/public/category-icons/";

    if (!categories || categories.length === 0) return null;

    return (
        <section className="container mx-auto px-4 py-14">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wider">
                    קטגוריות מוצרים
                </h2>
                {/* הקו המפריד המעוצב */}
                <div className="h-1 w-60 bg-[#ffce2f] mx-auto mt-2 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {categories.map((category, index) => {
                    let finalSrc = category.image_url;
                    
                    if (finalSrc) {
                        // חילוץ שם הקובץ בלבד מתוך המחרוזת ב-DB
                        // זה יטפל גם ב- "smartwatches.png" וגם ב- "/images/categories/smartwatches.png"
                        const fileName = finalSrc.split('/').pop();
                        finalSrc = `${STORAGE_BASE}${fileName}`;
                    }

                    return (
                            <Link 
                            key={category.id || index}
                            href={`/store?category=${encodeURIComponent(category.name)}`} 
                            className="group relative flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-[280px] w-full overflow-hidden transition-all duration-500"
                            >
                            {/* התמונה - נשארת גלויה */}
                            <div className="relative w-full h-48 transition-transform duration-700 group-hover:scale-105">
                                <img 
                                src={finalSrc} 
                                alt={category.name}
                                className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-[#ffce2f] via-[#ffce2f]/30 to-white/70 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10"></div>

                            {/* שם הקטגוריה והטקסט מעל השכבה הצהובה-לבנה */}
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 px-4">
                                <p className="font-bold text-black text-xl text-center leading-tight drop-shadow-sm">
                                {category.name}
                                </p>
                                <div className="h-0.5 w-12 bg-black mt-2"></div>
                                <p className="text-[11px] text-black font-semibold mt-2 uppercase tracking-wide">
                                צפה במוצרים
                                </p>
                            </div>

                            {/* השם המקורי שנמצא למטה כשאין Hover */}
                            <p className="absolute bottom-6 font-bold text-gray-800 group-hover:opacity-0 transition-opacity duration-300">
                                {category.name}
                            </p>
                            </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;