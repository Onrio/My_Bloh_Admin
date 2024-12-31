import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase';
import { MutationKeys } from '../mutationKeys';
import { QueryKeys } from '../../query/queryKeys';

// Add User
export const addUser = async (user: {
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
  status: string;
}) => {
  const { error } = await supabase.from('users').insert(user);
  if (error) {
    throw new Error(error.message);
  }
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(addUser, {
    mutationKey: MutationKeys.USER.ADD,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.USERS);
    },
    onError: (error: any) => {
      console.error('Failed to add user:', error.message);
    },
  });
};

// Update User
export const updateUser = async (user: {
  id: string;
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
  status: string;
}) => {
  const { error } = await supabase.from('users').update(user).eq('id', user.id);
  if (error) {
    throw new Error(error.message);
  }
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    mutationKey: MutationKeys.USER.UPDATE,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.USERS);
    },
    onError: (error: any) => {
      console.error('Failed to update user:', error.message);
    },
  });
};
