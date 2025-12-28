// src/components/FeaturedProducts.jsx

import { fetchFeaturedProductsByCategory } from '../../lib/data'; 
import ProductCard from './ProductCard'; 
import Link from 'next/link'; 

export default async function FeaturedProducts({ categoryName, titleOverride }) {
    
    const products = await fetchFeaturedProductsByCategory(categoryName, 100); 

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="py-15 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                
                {/* כותרת וכפתור */}
                <div className="flex justify-between items-center mb-10 pb-2">
                    
                    {/* הכותרת (צד ימין) */}
                    <h2 className="text-2xl font-normal text-black">
                        {titleOverride || `${categoryName}`}
                    </h2>

                    {/* כפתור "עוד מוצרים" (צד שמאל) */}
                    <Link 
                        href={`/store?category=${categoryName}`} 
                        className="text-sm font-medium text-black border border-black px-3 py-2 rounded-full hover:bg-blue-50 transition duration-150 ease-in-out"
                    >
                        צפה בעוד מוצרים
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} /> 
                    ))}
                </div>

            </div>
        </section>
    );
}