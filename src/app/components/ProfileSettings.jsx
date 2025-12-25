"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FiX, FiCamera, FiLogOut, FiUser, FiMail, FiLoader, FiMapPin, FiPhone, FiSave } from 'react-icons/fi';

const ProfileSettings = ({ isVisible, onClose, user }) => {
    const [uploading, setUploading] = useState(false);
    const [updating, setUpdating] = useState(false);

    // סטייטים עבור השדות החדשים
    const [phone, setPhone] = useState(user?.user_metadata?.phone || '');
    const [address, setAddress] = useState(user?.user_metadata?.address || '');
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');

    if (!isVisible || !user) return null;

    // פונקציה לעדכון פרטי טקסט (שם, טלפון, כתובת)
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const { error } = await supabase.auth.updateUser({
                data: { 
                    full_name: fullName,
                    phone: phone,
                    address: address 
                }
            });

            if (error) throw error;
            alert("הפרופיל עודכן בהצלחה!");
        } catch (error) {
            alert("שגיאה בעדכון הפרטים: " + error.message);
        } finally {
            setUpdating(false);
        }
    };

    // פונקציית העלאת תמונה (כפי שעשינו קודם)
    const handleAvatarUpload = async (event) => {
        try {
            setUploading(true);
            const file = event.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            if (updateError) throw updateError;
            alert("התמונה עודכנה!");
            window.location.reload();
        } catch (error) {
            alert("שגיאה בהעלאת התמונה: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" dir="rtl">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
                
                <button onClick={onClose} className="absolute top-6 left-6 text-gray-400 hover:text-black z-10">
                    <FiX size={24} />
                </button>

                <div className="p-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-6 italic tracking-tighter">הגדרות חשבון</h2>

                    {/* אזור תמונה */}
                    <div className="flex flex-col items-center mb-10">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full border-4 border-blue-50 overflow-hidden bg-gray-100 shadow-md">
                                <img 
                                    src={user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition-all">
                                {uploading ? <FiLoader className="animate-spin" size={16} /> : <FiCamera size={16} />}
                                <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* טופס עדכון פרטים */}
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                        {/* שם מלא */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 mr-2 uppercase">שם מלא</label>
                            <div className="relative">
                                <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                    placeholder="הכנס שם מלא"
                                />
                            </div>
                        </div>

                        {/* טלפון */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 mr-2 uppercase">מספר טלפון</label>
                            <div className="relative">
                                <FiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                    placeholder="050-0000000"
                                />
                            </div>
                        </div>

                        {/* כתובת */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 mr-2 uppercase">כתובת למשלוח</label>
                            <div className="relative">
                                <FiMapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-blue-600 transition-all font-medium"
                                    placeholder="עיר, רחוב, מספר בית"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={updating}
                            className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            {updating ? <FiLoader className="animate-spin" /> : <FiSave />}
                            {updating ? 'מעדכן...' : 'שמור שינויים'}
                        </button>
                    </form>

                    <button 
                        onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
                        className="w-full mt-6 py-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                        <FiLogOut /> התנתק
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;