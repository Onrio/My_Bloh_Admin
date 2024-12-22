import { useQuery, UseQueryOptions } from 'react-query';
import { supabase } from '@/supabase';

type UserProfile = {
  id: string;
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
  created_at: string;
};

export const fetchProfiles = async (): Promise<UserProfile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, georgian_name, mobile, about, created_at');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useUsersQuery = (
  options?: UseQueryOptions<UserProfile[], Error>
) => {
  return useQuery<UserProfile[], Error>('profiles', fetchProfiles, options);
};
