"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiStar, FiChevronLeft, FiHeart } from 'react-icons/fi'; 
import { useCart } from '../../context/CartContext'; 
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

const Rating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
        stars.push(
            <FiStar 
                key={i} 
                size={12} 
                className={i < fullStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} 
            />
        );
    }
    return <div className="flex space-x-0.5 space-x-reverse">{stars}</div>;
};

const ProductCard = ({ product, view = 'grid' }) => { 
    const { addToCart } = useCart(); 
    const { favorites, toggleFavorite } = useWishlist();
    const [isHovering, setIsHovering] = useState(false); 
    
    const productHref = `/store/${product.id}`; // שיניתי ל-store כפי שביקשת קודם
    const isInStock = product.stock_quantity === undefined || product.stock_quantity === null || product.stock_quantity > 0;
    const isFavorite = favorites.includes(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        if (isInStock) {
            addToCart(product);
            toast.success(`${product.name} נוסף לסל!`, {
                icon: '🛒',
                style: { borderRadius: '12px', background: '#333', color: '#fff' },
            });
        }
    };

    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(product.id);
    };

    if (!product || !product.price) return null;

    // --- תצוגת רשימה (List View) ---
    if (view === 'list') {
        return (
            <div dir="rtl" className="flex items-center bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100 mb-4 group">
                <Link href={productHref} className="relative w-28 h-28 flex-shrink-0 ml-5 overflow-hidden rounded-xl bg-gray-50">
                    <img 
                        src={product.image_url || 'https://via.placeholder.com/150'} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <Rating rating={product.rating || 4} />
                        <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                            {product.category || 'Original'}
                        </span>
                    </div>
                    <Link href={productHref}>
                        <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors truncate">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                </div>
                
                <div className="flex flex-col items-end justify-center mr-6 pl-4 border-r border-gray-50">
                    <span className="text-xl font-black text-gray-900 mb-2">₪{product.price.toLocaleString()}</span>
                    <button 
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all disabled:bg-gray-100"
                    >
                        <FiShoppingCart size={16} />
                        <span className="text-xs">הוספה</span>
                    </button>
                </div>
            </div>
        );
    }

    // --- תצוגת רשת (Grid View) - העיצוב המשופר ---
    return (
        <div dir="rtl" className="h-full group">
            <div className="relative flex flex-col h-full bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 overflow-hidden">
                
                {/* כפתור לב (Wishlist) - קטן ואלגנטי יותר */}
                <button 
                    onClick={handleToggleFavorite}
                    className="absolute top-3 left-3 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 shadow-sm hover:bg-white transition-all"
                >
                    <FiHeart 
                        size={16} 
                        className={`transition-colors duration-300 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-300"}`} 
                    />
                </button>

                {/* אזור תמונה - הקטנת הפינות המעוגלות */}
                <Link href={productHref} className="block relative w-full aspect-square bg-gray-50/50 rounded-xl overflow-hidden mb-4">
                    <img 
                        src={product.image_url || 'https://via.placeholder.com/400x300'} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    />
                    {!isInStock && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-[10px] font-bold shadow-lg">אזל מהמלאי</span>
                        </div>
                    )}
                </Link>

                {/* תוכן הכרטיס */}
                <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                        <Rating rating={product.rating || 5} />
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">ORIGINAL</span>
                    </div>

                    <Link href={productHref}>
                        <h3 className="text-[14px] font-bold text-gray-900 mb-1 line-clamp-1 leading-tight hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    
                    <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 h-8 leading-snug">
                        {product.description}
                    </p>
                    
                    <div className="mt-auto pt-3 border-t border-gray-50">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-black text-gray-900">
                                ₪{product.price.toLocaleString()}
                            </span>
                            {isInStock && (
                                <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> משלוח חינם
                                </span>
                            )}
                        </div>

                        {/* כפתורים - מבנה צפוף ומקצועי יותר */}
                        <div className="flex gap-2">
                            <Link 
                                href={productHref}
                                className="flex-1 flex items-center justify-center bg-gray-100 text-gray-900 text-[11px] font-bold h-10 rounded-lg hover:bg-gray-200 transition-all active:scale-95"
                                onMouseEnter={() => setIsHovering(true)} 
                                onMouseLeave={() => setIsHovering(false)} 
                            >
                                {isHovering ? <FiChevronLeft size={14} /> : "פרטי מוצר"}
                            </Link>
                            
                            <button 
                                onClick={handleAddToCart}
                                disabled={!isInStock}
                                className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-300 transition-all active:scale-95"
                            >
                                <FiShoppingCart size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;