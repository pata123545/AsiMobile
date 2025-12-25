// src/lib/data.js

import { supabase } from './supabase'; 

// --- הגדרות קבועות ---
const PRODUCTS_PER_PAGE = 12; 

/**
 * מנרמל ערכים ממחרוזות (חיתוך רווחים).
 * זה שומר על רישיות, כיוון ש-Supabase רגיש לרישיות בברירת מחדל.
 */
const normalizeValue = (value) => {
    if (typeof value === 'string') {
        return value.trim(); 
    }
    return value;
};


// =================================================================
// 1. טעינת מוצרים מרובים עם סינון, מיון ופגינציה
// =================================================================
export async function fetchProducts(searchParams) {
    
    // שימוש באובייקט ריק כברירת מחדל למניעת שגיאות
    const params = (searchParams && typeof searchParams === 'object') 
                   ? { ...searchParams } 
                   : {};

    try {
        console.log("--- DEBUG: Filter Parameters Received ---");
        console.log(params);
        // איפתוח פרמטרים בסיסיים
        const currentPage = parseInt(normalizeValue(params.page || '1')); 
        const category = normalizeValue(params.category);
        const sort = normalizeValue(params.sort);
        const pageSize = PRODUCTS_PER_PAGE;

        let query = supabase
            .from('products')
            .select('id, name, description, price, image_url, category_name, brand, storage, color, condition, screen_size', { count: 'exact' }); 

        // --- א. יישום סינון קטגוריה ---
        if (category && category !== 'all') {
            query = query.eq('category_name', category); 
        }

        // --- ב. יישום סינוני רשימה (IN filtering) ---

        // מיפוי סינוני IN: שם עמודה ב-DB <-> מפתח ב-URL
        const filterMappings = [
            { dbField: 'brand', urlKey: 'brands' },
            { dbField: 'color', urlKey: 'colors' },
            { dbField: 'storage', urlKey: 'storages' }, 
            { dbField: 'condition', urlKey: 'conditions' }, 
            { dbField: 'screen_size', urlKey: 'screen_sizes' }     
        ];

        filterMappings.forEach(({ dbField, urlKey }) => {
            if (params[urlKey]) { 
                const urlValues = params[urlKey].split(',');
                
                // ניקוי הערכים מה-URL וסינון ערכים ריקים
                const cleanedValues = urlValues
                    .map(normalizeValue)
                    .filter(v => String(v).trim() !== '');

                if (cleanedValues.length > 0) {
                    // ביצוע סינון מרובה ערכים
                    query = query.in(dbField, cleanedValues);
                }
            }
        });
        
        // --- ג. יישום סינון טווח מחירים (Range filtering) ---
        
        if (params.minPrice) {
            const min = parseFloat(params.minPrice); 
            if (!isNaN(min)) query = query.gte('price', min);
        }
        if (params.maxPrice) {
            const max = parseFloat(params.maxPrice);
            if (!isNaN(max)) query = query.lte('price', max);
        }

        // --- ד. יישום מיון (Ordering) ---
        let sortField = 'name';
        let ascending = true;

        if (sort === 'price-asc') {
            sortField = 'price';
            ascending = true;
        } else if (sort === 'price-desc') {
            sortField = 'price';
            ascending = false;
        } else if (sort === 'newest') {
            sortField = 'created_at'; // מניח שיש עמודת created_at
            ascending = false;
        }

        query = query.order(sortField, { ascending });


        // --- ה. יישום פגינציה (Pagination) ---
        const from = (currentPage - 1) * pageSize;
        const to = from + pageSize - 1;
        
        query = query.range(from, to);


        // --- ו. ביצוע השאילתה ---
        const { data: products, error, count: totalResults } = await query;

        if (error) {
            console.error("Supabase Query Error:", error.message);
            throw new Error(`שגיאה בטעינת הנתונים: ${error.message}`); 
        }

        const totalPages = Math.ceil((totalResults || 0) / pageSize);

        return {
            products: products || [],
            error: null,
            totalResults: totalResults || 0,
            totalPages: totalPages,
        };

    } catch (e) {
        console.error("Database fetchProducts error:", e);
        return {
            products: [],
            error: `שגיאה בטעינת המוצרים: ${e.message}`,
            totalResults: 0,
            totalPages: 1,
        };
    }
}


// =================================================================
// 2. טעינת אפשרויות סינון ייחודיות
// =================================================================
export async function fetchFilterOptions() {
     try {
         const filterOptions = {};
         const fields = ['brand', 'color', 'storage', 'condition', 'screen_size']; 
         
         for (const dbField of fields) {
             const { data, error } = await supabase
                 .from('products')
                 .select(dbField, { distinct: true }); 
                 
             if (error) {
                 console.warn(`Warning: Could not fetch distinct values for ${dbField}: ${error.message}`);
                 continue;
             }
             
             // ניקוי הערכים וסינון ערכים ריקים
             const cleanedValues = data
                 .map(item => normalizeValue(item[dbField])) 
                 .filter(value => value !== null && value !== undefined && String(value).trim() !== '');
             
             const uniqueCleanedValues = Array.from(new Set(cleanedValues));
 
             // יצירת מפתח ה-URL התואם
             let urlKey = dbField + 's';
             if (dbField === 'condition') urlKey = 'conditions'; // התאמה למפתח ה-URL
             if (dbField === 'screen_size') urlKey = 'screen_sizes';

             filterOptions[urlKey] = uniqueCleanedValues; 
         }
 
         // החזרת כל המפתחות הנדרשים בצורה מסודרת
         return {
             brands: filterOptions.brands || [],
             colors: filterOptions.colors || [],
             storages: filterOptions.storages || [],
             conditions: filterOptions.conditions || [],
             screen_sizes: filterOptions.screen_sizes || [],
         };
 
     } catch (e) {
         console.error("Critical Error in fetchFilterOptions:", e);
           return {
             brands: [], colors: [], storages: [], conditions: [], screen_sizes: []
         };
     }
}

export async function fetchProductById(id) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*') 
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;

    } catch (e) {
        console.error("Database fetchProductById error:", e);
        return null;
    }
}

export async function fetchFeaturedProductsByCategory(categoryName, limit = 4) {
    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .eq('category_name', categoryName)
            .limit(limit);

        if (error) {
            throw new Error(error.message);
        }
        return products;
    } catch (e) {
        console.error(`Database fetchFeaturedProductsByCategory error for ${categoryName}:`, e);
        return [];
    }
}

export async function fetchCategoriesWithImages() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, image_url') // וודא ש-image_url רשום כאן בדיוק
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('Database Error:', err);
    return [];
  }
}


export async function fetchAllCategoryNames() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('category_name', { distinct: true });

        if (error) {
            throw new Error(error.message);
        }

        return data.map(item => normalizeValue(item.category_name)).filter(name => name);
    } catch (e) {
        console.error("Database fetchAllCategoryNames error:", e);
        return [];
    }
}

export {
    fetchProducts,
    fetchProductById,
    fetchFeaturedProductsByCategory,
    fetchCategoriesWithImages, 
    fetchFilterOptions,
    fetchAllCategoryNames, 
};