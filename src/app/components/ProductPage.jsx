"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Heart, ShieldCheck, Truck, 
  Star, Share2, RefreshCw, ChevronRight, ChevronLeft 
} from 'lucide-react';

export default function ProductView({ product }) {
  // ניהול המצב - הכל נגזר מהאובייקט product שמגיע מ-Supabase
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || {});
  const [isLiked, setIsLiked] = useState(false);

  // פונקציית עזר לפורמט מחיר
  const formatPrice = (price) => new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-[#FBFBFB] py-12 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* גלריית תמונות (7 מתוך 12 עמודות) */}
          <div className="lg:col-span-7 sticky top-8">
            <div className="relative aspect-[4/5] bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-12">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </AnimatePresence>
              
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-8 left-8 p-4 bg-white/80 backdrop-blur-xl rounded-full shadow-lg hover:scale-110 transition-all active:scale-90 z-10"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-6 justify-center overflow-x-auto py-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all bg-white p-2 flex-shrink-0 ${
                    selectedImage === i ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* פרטי מוצר ורכישה (5 מתוך 12 עמודות) */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-yellow-700 font-bold text-xs">4.9</span>
                </div>
              </div>

              <h1 className="text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-black text-gray-900">{formatPrice(product.price)}</span>
                {product.old_price && (
                  <span className="text-xl text-gray-400 line-through font-medium">{formatPrice(product.old_price)}</span>
                )}
              </div>

              <p className="text-gray-500 text-lg leading-relaxed mb-10 border-b border-gray-100 pb-10">
                {product.description}
              </p>

              {/* צבעים - דינמי מתוך JSONB ב-Supabase */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-tighter">צבע: {selectedColor.name}</h3>
                  <div className="flex gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-11 h-11 rounded-full border-2 p-1 transition-all ${
                          selectedColor.name === color.name ? 'border-indigo-600 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                        }`}
                      >
                        <div className="w-full h-full rounded-full shadow-inner border border-black/5" style={{ backgroundColor: color.hex }}></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* מידות/נפחים - דינמי מתוך מערך ב-Supabase */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-sm font-black text-gray-900 mb-4 uppercase tracking-tighter">אפשרויות בחירה</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                          selectedSize === size 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                          : 'border-gray-100 text-gray-400 hover:border-gray-200 bg-white shadow-sm'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* כפתורי פעולה */}
              <div className="flex gap-4 mb-12">
                <button className="flex-[4] bg-gray-900 hover:bg-black text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-2xl shadow-gray-200 active:scale-95 group">
                  <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                  הוספה לסל הקניות
                </button>
                <button className="flex-1 border-2 border-gray-100 rounded-[2rem] flex items-center justify-center hover:bg-white hover:border-gray-300 transition-all">
                  <Share2 className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex flex-col items-center gap-2">
                  <Truck className="w-6 h-6 text-indigo-600" />
                  <span className="text-[10px] font-black text-gray-800 uppercase">משלוח חינם</span>
                </div>
                <div className="flex flex-col items-center gap-2 border-x border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  <span className="text-[10px] font-black text-gray-800 uppercase">אחריות מלאה</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-6 h-6 text-indigo-600" />
                  <span className="text-[10px] font-black text-gray-800 uppercase">החזרה גמישה</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}