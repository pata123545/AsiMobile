// src/context/CartContext.js
"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const initialProductList = [
    { id: 1, name: "מחשב נייד חזק", price: 4500.00, image_url: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Laptop", description: "מחשב נייד מקצועי עם מעבד i9 ו-32GB RAM." },
    { id: 2, name: "אוזניות אלחוטיות", price: 350.00, image_url: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Headphones", description: "אוזניות בלוטות' עם ביטול רעשים אקטיבי וסוללה חזקה." },
    { id: 3, name: "עכבר גיימינג", price: 150.00, image_url: "https://via.placeholder.com/150/00FF00/FFFFFF?text=Mouse", description: "עכבר ארגונומי עם חיישן אופטי מדויק." },
];

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartSidebarVisible, setIsCartSidebarVisible] = useState(false);
    const [isProductSidebarVisible, setIsProductSidebarVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [products] = useState(initialProductList);

    // 1. תיקון טעינה: שימוש ב-setCartItems ובמפתח אחיד 'cartItems'
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            } catch (e) {
                console.error("Error parsing cart", e);
            }
        }
    }, []);

    // 2. שמירה ב-localStorage בכל שינוי
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
    
    // חישובים
    const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);

    // פונקציות עגלה
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
        setIsCartSidebarVisible(true);
    };
    
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCartItems(prevItems => prevItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    // פונקציה לניקוי העגלה (חשוב ל-Checkout)
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };
    
    const openCartSidebar = () => setIsCartSidebarVisible(true);
    const closeCartSidebar = () => setIsCartSidebarVisible(false);

    const openProductSidebar = (product) => {
        setSelectedProduct(product);
        setIsProductSidebarVisible(true);
        setIsCartSidebarVisible(false); 
    };

    const closeProductSidebar = () => {
        setIsProductSidebarVisible(false);
        setSelectedProduct(null);
    };

    const value = {
        products,
        cartItems,
        cart: cartItems, // הוספת כינוי (Alias) כדי שדף ה-Checkout לא יישבר
        totalPrice,
        cartTotal: totalPrice, // הוספת כינוי עבור ה-Checkout
        totalItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartSidebarVisible,
        openCartSidebar,
        closeCartSidebar,
        isProductSidebarVisible,
        selectedProduct,
        openProductSidebar,
        closeProductSidebar
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);