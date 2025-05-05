import { createClient } from '@supabase/supabase-js';
const { SUPABASE_URL, SUPABASE_API_KEY } = process.env;
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
export { supabase };