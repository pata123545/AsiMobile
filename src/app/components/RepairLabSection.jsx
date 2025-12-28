import React from 'react';
import { FiBatteryCharging } from 'react-icons/fi';
import { SlScreenSmartphone } from "react-icons/sl";
import { LuDatabaseBackup } from "react-icons/lu";
import { TbBatteryCharging2 } from "react-icons/tb";
import { CgSoftwareDownload } from "react-icons/cg";
import { CiCamera } from "react-icons/ci";
import Link from 'next/link';

const services = [
    { icon: SlScreenSmartphone , title: "תיקון מסך", description: "אצלנו באסי מובייל תוכלו ליהנות מתיקון החלפת מסך לסלולרי שלכם בזמן המתנה של כ-20 דקות בלבד! שירות מקצועי עי טכנאי דרג ד"},
    { icon: LuDatabaseBackup, title: "גיבוי ושחזור מידע", description: "באסי מובייל צוות הטכנאים מתמחה בשחזור מידע מטלפונים מושבתים שעברו פגיעה ולא נדלקו מכל סיבה שהיא" },
    { icon: TbBatteryCharging2, title: "החלפת שקע טעינה", description: "המטען עושה בעיות? אל תחליפו מכשיר, באסי מובייל אנו מתמחים בתיקון והחלפת שקעי טעינה בעבודה מיקרוסקופית מדויקת"},
    { icon: CgSoftwareDownload, title: "עדכוני תוכנה", description: "הטלפון לא מתעדכן? אנחנו כאן כדי לעזור!גרסת תוכנה ישנה עלולה לגרום לאיטיות ולתקלות. במעבדה של אסי מובייל אנחנו מחזיקים בכלים המתקדמים ביותר לשדרוג תוכנה" },
    { icon: FiBatteryCharging, title: "החלפת סוללה", description: "הסוללה נגמרת מהר? אל תישארו מנותקים באסי מובייל מחזירים לכם את האנרגיה בתוך 15 דקות בלבד. אנחנו מבצעים החלפת סוללה מקצועית לכל סוגי המכשירים" },
    { icon: CiCamera, title: "החלפת מצלמה", description: "התמונות יוצאות מטושטשות? רואים נקודות שחורות בצילום? או שהעדשה פשוט נשברה? אל תתנו לרגעים היפים שלכם להיעלם. באסי מובייל אנחנו מחזירים לכם את הפוקוס " },
];

export default function RepairLabSection() {
    return (
        // שינוי my-25 לערך רספונסיבי
        <section className="container mx-auto px-4 sm:px-6 my-12 md:my-25" dir="rtl">
            <div className="rounded-xl p-4 md:p-10 lg:p-15">
                
                <div className="text-center mb-10 md:mb-20">
                    <h2 className="text-3xl md:text-4xl font-normal text-black mb-5">
                        שירותי המעבדה שלנו
                    </h2>
                </div>
                
                {/* הגריד הופך לטור אחד במובייל ושלושה בדסקטופ */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            // התיקון הקריטי: הסרתי w-[450px] והשתמשתי ב-w-full עם max-w
                            // הוספתי min-h במקום h קבוע כדי שהטקסט לא ייחתך במובייל
                            className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-gray-300 flex flex-col w-full max-w-[450px] min-h-[250px]"
                        >
                            <service.icon className="mx-auto text-black mb-4 md:mb-6" size={40} />
                            
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-lg md:text-xl font-bold text-black mb-3 md:mb-6">
                                    {service.title}
                                </h3>
                                <p className="text-sm md:text-md text-black leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <Link
                        href="/booking"
                        className="inline-block bg-black text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105 active:scale-95"
                    >
                        קבעו תור לתיקון עוד היום!
                    </Link>
                </div>
            </div>
        </section>
    );
}