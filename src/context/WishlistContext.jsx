"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast'; // ייבוא ה-Toast

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('favorites')
                .select('product_id')
                .eq('user_id', user.id);

            if (!error) setFavorites(data.map(item => item.product_id));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchFavorites(); }, []);

    const toggleFavorite = async (productId) => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
            toast.error("אנא התחבר כדי לשמור מוצרים");
            return;
        }

        const isAlreadyFav = favorites.includes(productId);

        if (isAlreadyFav) {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (!error) {
                setFavorites(prev => prev.filter(id => id !== productId));
                toast('הוסר מהמועדפים', { icon: '🗑️' });
            }
        } else {
            const { error } = await supabase
                .from('favorites')
                .insert([{ user_id: user.id, product_id: productId }]);

            if (!error) {
                setFavorites(prev => [...prev, productId]);
                toast.success('נוסף ל-Wishlist!');
            }
        }
    };

    return (
        <WishlistContext.Provider value={{ favorites, toggleFavorite, loading }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);