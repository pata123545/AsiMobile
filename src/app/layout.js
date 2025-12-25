// src/app/layout.js


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// ייבוא ClientLayout כדי לטעון את שאר הרכיבים
import ClientLayout from "./components/ClientLayout"; 
import { Toaster } from 'react-hot-toast'; // השורה שחסרה לך!
import MobileBottomNav from "./components/MobileBottomNav";




const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata = { 
    title: "E-Commerce App",
    description: "Full stack e-commerce application built with Next.js",
};





export default function RootLayout({ children }) {
    return (
        <html lang="he" dir="rtl">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f0f0]`}
            >
                <Toaster 
          position="bottom-left" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '16px',
              padding: '12px 24px',
              fontWeight: 'bold',
              fontSize: '14px',
            },
          }} 
        />
              
                <ClientLayout>
                    {children}
                    <MobileBottomNav />
                </ClientLayout>

              
             
            </body>
        </html>
    );
}