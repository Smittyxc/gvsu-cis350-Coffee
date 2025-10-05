import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Or directly paste your URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Or directly paste your key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);