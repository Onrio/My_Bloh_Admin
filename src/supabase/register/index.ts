import { supabase } from '@/supabase';
import { useNavigate } from 'react-router-dom';

export async function registerUser({
  email,
  password,
  name,
  georgianName,
  mobile,
  twitter = '',
  facebook = '',
  linkedin = '',
  github = '',
  about = '',
  navigate,
}: {
  email: string;
  password: string;
  name: string;
  georgianName: string;
  mobile: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  about?: string;
  navigate: ReturnType<typeof useNavigate>;
}) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: name,
          georgian_name: georgianName,
          mobile,
          twitter,
          facebook,
          linkedin,
          github,
          about,
        },
      },
    });

    if (authError) {
      console.error('Supabase sign-up error:', authError.message);
      throw new Error(`Sign-up failed: ${authError.message}`);
    }

    if (!authData) {
      throw new Error('Unexpected error: No data returned from Supabase.');
    }

    navigate('/');
    return authData;
  } catch (error: any) {
    console.error('Registration error:', error.message);
    throw new Error(
      error.message || 'Registration failed. Please try again later.'
    );
  }
}
