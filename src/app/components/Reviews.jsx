"use client";
import React from 'react';
import { FaStar, FaGoogle } from 'react-icons/fa';

const reviews = [
    {
        id: 1,
        name: "ישראל ישראלי",
        text: "שירות מדהים! החליפו לי מסך תוך פחות מ-30 דקות. מחיר הוגן ומקצועיות ברמה גבוהה.",
        rating: 5,
        date: "לפני שבוע"
    },
    {
        id: 2,
        name: "משה לוי",
        text: "המעבדה הכי טובה בקרית אתא. תיקנו לי שקע טעינה תחת מיקרוסקופ והסבירו לי הכל בסבלנות.",
        rating: 5,
        date: "לפני חודש"
    },
    {
        id: 3,
        name: "דנה כהן",
        text: "מהירים מאוד. החלפתי סוללה לאייפון והטלפון חזר לעבוד כמו חדש. מומלץ בחום!",
        rating: 5,
        date: "לפני שבועיים"
    }
];

const Reviews = () => {
    return (
        <section className="py-20 " dir="rtl">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-4 text-gray-600">
                    <FaGoogle />
                    <span className="font-medium">דירוג 4.9 בגוגל</span>
                </div>
                <h2 className="text-3xl font-bold text-black mb-12">לקוחות ממליצים</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
                    {reviews.map((review) => (
                        <div key={review.id} className="p-8 bg-white rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                            </div>
                            <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                            <div>
                                <h4 className="font-bold text-black">{review.name}</h4>
                                <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;