import { useQuery } from 'react-query';
import { supabase } from '@/supabase';
import { QueryKeys } from '../queryKeys';

export const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useUsersQuery = () => {
  return useQuery(QueryKeys.USERS, fetchUsers);
};
