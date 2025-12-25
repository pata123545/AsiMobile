// src/app/components/ClientLayout.jsx
"use client"; 

import React from 'react';
import { CartProvider } from "@/context/CartContext";
import TopHeader from './TopHeader';
import Header from "./Header";
import CartSidebar from "./CartSidebar"; 
import { WishlistProvider } from '@/context/WishlistContext';

// אם אתה רוצה גם את סייד-באר המוצר:
// import ProductSidebar from "@/components/ProductSidebar"; 

export default function ClientLayout({ children }) {
    return (
        <CartProvider>
        <WishlistProvider >
            <TopHeader />
            <Header />

            <main>
                {children}
            </main>
           
            <CartSidebar /> 
            {/* אם אתה רוצה גם את סייד-באר המוצר: */}
            {/* <ProductSidebar /> */}
        </WishlistProvider>
         </CartProvider>
    );
}