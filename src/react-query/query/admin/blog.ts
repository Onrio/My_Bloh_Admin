import { useQuery } from 'react-query';
import { supabase } from '@/supabase';
import { QueryKeys } from '../queryKeys';

export const fetchBlogs = async () => {
  const { data, error } = await supabase.from('blog').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useBlogsQuery = () => {
  return useQuery(QueryKeys.BLOGS, fetchBlogs);
};
