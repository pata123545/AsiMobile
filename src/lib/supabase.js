import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// הוספת בדיקה פשוטה שמונעת קריסה ב-Build
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn("Building without Supabase URL - using placeholder");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)