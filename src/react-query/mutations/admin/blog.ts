import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase';
import { MutationKeys } from '../mutationKeys';
import { QueryKeys } from '../../query/queryKeys';

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
    mutationKey: MutationKeys.BLOG.ADD,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.BLOGS);
    },
    onError: (error: any) => {
      console.error('Failed to add blog:', error.message);
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
    mutationKey: MutationKeys.BLOG.UPDATE,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.BLOGS);
    },
    onError: (error: any) => {
      console.error('Failed to update blog:', error.message);
    },
  });
};
