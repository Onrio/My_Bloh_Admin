import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase';

// Add Blog
export const addBlog = async (blog: {
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
}) => {
  const { error } = await supabase.from('blog').insert(blog);
  if (error) {
    throw new Error(error.message);
  }
};

export const useAddBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blog');
    },
  });
};

// Update Blog
export const updateBlog = async (blog: {
  id: string;
  title_ka: string;
  title_en: string;
  description_ka: string;
  description_en: string;
}) => {
  const { error } = await supabase.from('blog').update(blog).eq('id', blog.id);

  if (error) {
    throw new Error(error.message);
  }
};

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blog');
    },
  });
};
