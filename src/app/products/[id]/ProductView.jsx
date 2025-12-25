"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Heart, ShieldCheck, Truck, 
  Star, Check, ChevronRight, ChevronLeft, Home, Share2 
} from 'lucide-react';
import Link from 'next/link';
// וודא שהנתיב כאן תואם למיקום הקובץ שלך
import { useCart } from '@/context/CartContext'; 

export default function ProductView({ product, relatedProducts }) {
  const router = useRouter();
  
  // שימוש ב-Context שלך
  const { addToCart, openCartSidebar } = useCart();
  
  // סטייט מקומי לאפקטים ויזואליים
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  // טיפול בתמונות (Fallback)
  const images = product.images?.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/800x800?text=No+Image+Available'];

  // פונקציית הוספה לסל שמחוברת ל-CartContext שלך
  const handleAddToCart = () => {
    // 1. הוספה פיזית לסל
    addToCart(product, 1);
    
    // 2. אפקט ויזואלי בכפתור
    setIsAdded(true);
    
    // 3. פתיחת הסייד-באר (כפי שהוגדר ב-Context שלך)
    openCartSidebar();

    // איפוס האנימציה בכפתור אחרי 2 שניות
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] pb-20" dir="rtl">
      
      {/* --- 1. Top Navigation (כפתור חזור עגול וניווט) --- */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-100 hover:scale-110 hover:shadow-lg transition-all active:scale-95 group flex-shrink-0"
          >
            <ChevronRight className="w-6 h-6 text-gray-900 group-hover:translate-x-1 transition-transform" />
          </button>

          <nav className="flex items-center space-x-reverse space-x-3 text-sm overflow-hidden">
            <Link href="/" className="text-gray-400 hover:text-black transition-colors flex items-center gap-1 flex-shrink-0">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">ראשי</span>
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-300 flex-shrink-0" />
            <Link href="/products" className="text-gray-400 hover:text-black transition-colors font-normal flex-shrink-0">
              חנות
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-300 flex-shrink-0" />
            <span className="text-black font-normal truncate tracking-tight italic">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* --- 2. Main Product Content --- */}
      <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* צד ימין: גלריה */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-square rounded-[3rem] bg-white overflow-hidden shadow-sm border border-gray-50 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-contain p-12"
              />
            </AnimatePresence>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar justify-center lg:justify-start">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-[1.5rem] border-2 transition-all bg-white p-2 ${
                  selectedImage === i ? 'border-black scale-105 shadow-md' : 'border-transparent opacity-40 hover:opacity-100'
                }`}
              >
                <img src={img} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* צד שמאל: פרטים */}
        <div className="lg:col-span-5 flex flex-col space-y-10">
          <header>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-black text-white px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em]">
                {product.brand || 'Premium'}
              </span>
              <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-3 py-1 rounded-xl">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-black text-yellow-700">4.9</span>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-normal text-black leading-[1] tracking-tighter normal">
              {product.name}
            </h1>
          </header>

          <div className="flex items-center gap-6">
            <span className="text-3xl font-normal text-black">₪{product.price?.toLocaleString()}</span>
            {product.old_price && (
              <span className="text-3xl text-gray-400 line-through">₪{product.old_price.toLocaleString()}</span>
            )}
          </div>

          <p className="text-black text-xl leading-relaxed max-w-lg">
            {product.description}
          </p>

          {/* כפתור הוספה לסל המחובר ל-Context */}
          <div className="pt-6 hidden lg:block">
            <button 
              onClick={handleAddToCart}
              className={`w-90 py-3 rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 shadow-2xl ${
                isAdded ? 'bg-green-600 text-white scale-95' : 'bg-black text-white hover:bg-gray-800 active:scale-95 shadow-gray-200'
              }`}
            >
              {isAdded ? <Check className="w-8 h-8 animate-bounce" /> : <ShoppingCart className="w-7 h-7" />}
              {isAdded ? 'התווסף בהצלחה' : 'הוספה לסל הקניות'}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-3">
              <Truck className="w-7 h-7 text-gray-900" />
              <span className="text-[10px] font-black uppercase text-gray-400">משלוח חינם</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 border-x border-gray-100">
              <ShieldCheck className="w-7 h-7 text-gray-900" />
              <span className="text-[10px] font-black uppercase text-gray-400">אחריות מלאה</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <Share2 className="w-7 h-7 text-gray-900" />
              <span className="text-[10px] font-black uppercase text-gray-400">שתף מוצר</span>
            </div>
          </div>
        </div>
      </main>

      {/* --- 3. Related Products --- */}
      {relatedProducts?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 mt-32 border-t border-gray-100 pt-20">
          <h2 className="text-3xl font-black text-gray-900 mb-10">מוצרים קשורים</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="group space-y-4">
                <div className="aspect-square bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={item.images?.[0]} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-black transition-colors truncate">{item.name}</h3>
                  <p className="text-gray-500 font-medium italic">₪{item.price?.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- 4. Mobile Sticky Bar --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t p-6 pb-10 z-50 flex items-center justify-between gap-6 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">סה"כ</span>
          <span className="text-3xl font-black text-gray-900">₪{product.price?.toLocaleString()}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className={`flex-[2] py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-2 ${
            isAdded ? 'bg-black text-white' : 'bg-black text-white shadow-xl shadow-gray-200'
          }`}
        >
          {isAdded ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
          {isAdded ? 'בסל!' : 'הוספה לסל'}
        </button>
      </div>

    </div>
  );
}