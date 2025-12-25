"use client";

import React, { useEffect, useState } from 'react';
import { FaStar, FaGoogle } from 'react-icons/fa';

const GoogleReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    const PLACE_ID = "ChIJi2QWLy63HRURBeGZHWQS2bI";
    const API_KEY = "YOUR_GOOGLE_API_KEY"; // שים כאן את המפתח שלך

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // ב-Next.js מומלץ לעשות את הפנייה הזו דרך API Route כדי להגן על המפתח
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${API_KEY}&language=he`
                );
                const data = await response.json();
                
                if (data.result) {
                    setReviews(data.result.reviews || []);
                    setRating(data.result.rating || 0);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Google reviews:", error);
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <div className="text-center py-10">טוען המלצות מגוגל...</div>;

    return (
        <section className="py-16 bg-[#fcfcfc]" dir="rtl">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaGoogle className="text-red-500" />
                        <span className="text-xl font-medium text-black">{rating} מתוך 5 כוכבים</span>
                    </div>
                    <h2 className="text-3xl text-black">מה הלקוחות שלנו אומרים?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.slice(0, 3).map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={review.profile_photo_url} alt={review.author_name} className="w-10 h-10 rounded-full" />
                                    <div>
                                        <h4 className="text-sm font-bold text-black">{review.author_name}</h4>
                                        <div className="flex text-yellow-400 text-xs">
                                            {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    "{review.text.length > 150 ? review.text.substring(0, 150) + "..." : review.text}"
                                </p>
                            </div>
                            <span className="text-xs text-gray-400">{review.relative_time_description}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;