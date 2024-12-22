import dotenv from 'dotenv';
dotenv.config();

console.log('Supabase URL:', process.env.VITE_SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.VITE_SUPABASE_ANON_KEY);
