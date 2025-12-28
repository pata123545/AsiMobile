// src/app/store/page.jsx
import { fetchProducts, fetchFilterOptions, fetchAllCategoryNames } from '../../lib/data';
import StorePageClient from './StorePageClient'; // ייבוא הקובץ שיצרנו בשלב 1

export default async function StorePage({ searchParams }) {
    // 1. קבלת פרמטרים בשרת
    const resolvedParams = await searchParams;
    const params = Object.fromEntries(new URLSearchParams(resolvedParams));
    
    // 2. שליפת נתונים בשרת (כאן המוצרים חוזרים!)
    const [productsData, filterOptions, categoryNames] = await Promise.all([
        fetchProducts(params),
        fetchFilterOptions(),
        fetchAllCategoryNames()
    ]);

    const products = productsData?.products || [];
    const totalPages = productsData?.totalPages || 1;
    const totalResults = productsData?.totalResults || 0;
    const currentPage = parseInt(params.page || '1');

    // 3. שליחת הנתונים לקומפוננטת הלקוח
    return (
        <StorePageClient 
            products={products}
            totalPages={totalPages}
            totalResults={totalResults}
            filterOptions={filterOptions}
            categoryNames={categoryNames}
            params={params}
            currentPage={currentPage}
        />
    );
}