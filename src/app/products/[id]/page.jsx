import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import ProductView from './ProductView';

// 1. אתחול הקליינט של סופבייס (Server-Side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function ProductPage({ params }) {
  // 2. חילוץ ה-ID מה-URL (חובה להשתמש ב-await בגרסאות Next.js החדשות)
  const { id } = await params;

  // 3. שליפת הנתונים של המוצר הספציפי
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  // 4. אם יש שגיאה או שהמוצר לא נמצא - הצגת דף 404 מובנה
  if (productError || !product) {
    notFound();
  }

  // 5. שליפת מוצרים קשורים (באותה קטגוריה, למעט המוצר הנוכחי)
  const { data: relatedProducts, error: relatedError } = await supabase
    .from('products')
    .select('*')
    .eq('category', product.category)
    .not('id', 'eq', id) // מוודא שלא נציג את המוצר שבו אנחנו צופים כרגע
    .limit(4);           // מביא עד 4 מוצרים

  // 6. העברת כל הנתונים לקומפוננטת התצוגה (Client Component)
  return (
    <ProductView 
      product={product} 
      relatedProducts={relatedProducts || []} 
    />
  );
}