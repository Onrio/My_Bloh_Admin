import { useQuery } from 'react-query';
import { supabase } from '@/supabase';

const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from('blog')
    .select(
      'id, title_ka, title_en, description_ka, description_en, created_at'
    );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useBlogsQuery = () => {
  return useQuery('blogs', fetchBlogs);
};
