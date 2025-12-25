import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// יצירת קליינט Supabase עם מפתח Admin (Service Role) 
// כי אנחנו צריכים לעדכן נתונים בלי קשר למשתמש מחובר
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    try {
        // טרנזילה שולחת נתונים בפורמט x-www-form-urlencoded
        const formData = await req.formData();
        const response = Object.fromEntries(formData.entries());

        const orderId = response.orderid; // מספר ההזמנה ששלחנו (ASI-XXXX)
        const responseCode = response.res; // קוד תגובה (000 בטרנזילה זה הצלחה)

        if (responseCode === "000") {
            // עדכון הסטטוס ב-Supabase ל'processing' או 'paid'
            const { error } = await supabaseAdmin
                .from('orders')
                .update({ 
                    status: 'processing',
                    payment_id: response.tranid, // מספר הטרנזקציה בטרנזילה לצורך מעקב
                    updated_at: new Date()
                })
                .eq('order_number', orderId);

            if (error) throw error;
            
            console.log(`Order ${orderId} updated to paid successfully.`);
            return new NextResponse('OK', { status: 200 });
        }

        return new NextResponse('Payment failed', { status: 400 });

    } catch (error) {
        console.error('Webhook Error:', error.message);
        return new NextResponse('Webhook error', { status: 500 });
    }
}