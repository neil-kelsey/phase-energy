import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key
const supabaseUrl = 'https://cxxgstipihpvccnbbjpq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4eGdzdGlwaWhwdmNjbmJianBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDE1NTksImV4cCI6MjA2MTUxNzU1OX0.a4s4VStEGCfV0h1ZcH3P-LKVt8Rz9vegrlAE5-F0A4I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 