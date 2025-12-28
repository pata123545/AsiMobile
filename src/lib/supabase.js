// TypeScript example: move client creation inside handler
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // use the exact env var name your code expects
  if (!url || !key) {
    throw new Error('Server environment variables SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  }
  return createClient(url, key);
}

export async function POST(req: Request) {
  const supabase = getSupabaseClient();
  // ...handle request
}
