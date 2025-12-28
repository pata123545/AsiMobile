"use client";

import { useState } from 'react'; 
import { useRouter, useSearchParams } from 'next/navigation'; 
import { usePathname } from 'next/navigation';

// ===============================================
// פונקציית עזר: עוטפת כל בלוק סינון
// ===============================================

const FilterSection = ({ title, children, border = true }) => (
    <div className="pt-4">
        <h3 className="text-base font-bold text-gray-800 mb-3 text-right">{title}</h3>
        {children}
        {border && <div className="border-b border-gray-200 mt-4"></div>}
    </div>
);


// ===============================================
// הקומפוננטה הראשית
// ===============================================

export default function ProductFilters({ 
    initialFilterOptions = {} 
}) {
    // חילוץ בטוח של המשתנים עם מערך ריק כברירת מחדל למניעת שגיאות length
    const { 
        brands = [], 
        colors = [], 
        storages = [], 
        conditions = [], 
        screen_sizes = [] 
    } = initialFilterOptions || {};
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname(); 

    const MAX_PRICE_VALUE = 8000;
    const MIN_PRICE_VALUE = 0;

    const [priceRange, setPriceRange] = useState({
        min: Number(searchParams.get('minPrice')) || MIN_PRICE_VALUE,
        max: Number(searchParams.get('maxPrice')) || MAX_PRICE_VALUE, 
    });
    
    const handleCheckboxChange = (key, value) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        const currentValues = currentParams.get(key) ? currentParams.get(key).split(',') : [];
        let newValues;

        if (currentValues.includes(value)) {
            newValues = currentValues.filter(v => v !== value);
        } else {
            newValues = [...currentValues, value];
        }

        if (newValues.length > 0) {
            currentParams.set(key, newValues.join(','));
        } else {
            currentParams.delete(key);
        }
        
        currentParams.delete('page');
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
    };

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (priceRange.min > MIN_PRICE_VALUE) {
            params.set('minPrice', priceRange.min.toString());
        } else {
            params.delete('minPrice');
        }

        if (priceRange.max < MAX_PRICE_VALUE) {
            params.set('maxPrice', priceRange.max.toString());
        } else {
            params.delete('maxPrice');
        }
        
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    
    const handlePriceChange = (field, value) => {
        const numValue = Number(value);
        if (field === 'min' && numValue >= priceRange.max) return; 
        if (field === 'max' && numValue <= priceRange.min) return;
        setPriceRange(prev => ({ ...prev, [field]: numValue }));
    };

    const minPercent = (priceRange.min / MAX_PRICE_VALUE) * 100;
    const maxPercent = 100 - (priceRange.max / MAX_PRICE_VALUE) * 100;
    
    // ===============================================
    // פונקציית עזר מתוקנת: רשימת סינון גנרית
    // ===============================================
    const CheckboxFilterList = ({ items = [], urlKey }) => {
        // הגנה קריטית: אם items הוא null או undefined, נשתמש במערך ריק
        const safeItems = Array.isArray(items) ? items : [];
        const activeValues = searchParams.get(urlKey) ? searchParams.get(urlKey).split(',') : [];

        if (safeItems.length === 0) {
            return <p className="text-gray-400 text-xs py-2 text-right">אין נתונים זמינים.</p>;
        }

        return (
            <div className="space-y-1 max-h-48 overflow-y-auto pr-2" dir="rtl">
                {safeItems.map(item => (
                    <label 
                        key={item} 
                        className="flex items-center text-sm text-gray-700 cursor-pointer hover:bg-gray-100 p-1 rounded transition duration-150"
                    >
                        <input 
                            type="checkbox" 
                            checked={activeValues.includes(item)} 
                            onChange={() => handleCheckboxChange(urlKey, item)} 
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ml-2" 
                        />
                        <span className="flex-grow text-right">{item}</span>
                    </label>
                ))}
            </div>
        );
    };

    return (
        <aside className="p-4 bg-white shadow-xl rounded-lg border border-gray-100" dir="rtl">
            <h2 className="text-xl font-extrabold text-indigo-700 mb-6 border-b-4 border-indigo-100 pb-2 text-right">
                סינון מוצרים
            </h2>
            
            <FilterSection title="סינון לפי מחיר" border={false}>
                <div className="relative h-10 flex items-center mx-2">
                    <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
                    <div 
                        className="absolute h-1 bg-black rounded-full"
                        style={{ right: `${minPercent}%`, left: `${maxPercent}%` }}
                    ></div>
                    
                    <input
                        type="range"
                        min={MIN_PRICE_VALUE}
                        max={MAX_PRICE_VALUE}
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        className="range-input absolute w-full pointer-events-none appearance-none bg-transparent z-30"
                    />

                    <input
                        type="range"
                        min={MIN_PRICE_VALUE}
                        max={MAX_PRICE_VALUE}
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        className="range-input absolute w-full pointer-events-none appearance-none bg-transparent z-40"
                    />
                </div>
                
                <div className="flex justify-between items-center text-sm font-semibold mt-4">
                    <span className="text-gray-700 font-bold">
                        ₪{priceRange.min.toLocaleString()} - ₪{priceRange.max.toLocaleString()}
                    </span>
                    <button 
                        onClick={applyPriceFilter} 
                        className="px-4 py-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm font-bold shadow-md"
                    >
                        סנן
                    </button>
                </div>
            </FilterSection>
            
            <div className="border-b border-gray-200 mt-4"></div>
            
            <FilterSection title="סנן לפי מצב">
                <CheckboxFilterList items={conditions} urlKey="conditions" />
            </FilterSection>
            
            <FilterSection title="סנן לפי מותג">
                <CheckboxFilterList items={brands} urlKey="brands" />
            </FilterSection>

            <FilterSection title="סנן לפי נפח אחסון">
                <CheckboxFilterList items={storages} urlKey="storages" />
            </FilterSection>

            <FilterSection title="סנן לפי גודל מסך">
                <CheckboxFilterList items={screen_sizes} urlKey="screen_sizes" />
            </FilterSection>

            <FilterSection title="סנן לפי צבע" border={false}>
                <CheckboxFilterList items={colors} urlKey="colors" />
            </FilterSection>
        </aside>
    );
}