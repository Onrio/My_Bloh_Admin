import { supabase } from '@/supabase';

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error('Error during Supabase login:', authError.message);
      throw new Error('Login failed: ' + authError.message);
    }

    return authData;
  } catch (error: any) {
    console.error('Login process encountered an error:', error.message);
    throw new Error('An error occurred during login. Please try again later.');
  }
}
