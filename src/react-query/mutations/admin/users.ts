import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '@/supabase';

type UserProfile = {
  id: string;
  username: string;
  georgian_name: string;
  mobile: string;
  about: string;
  created_at: string;
};

export const addUser = async (user: UserProfile): Promise<void> => {
  const { error } = await supabase.from('profiles').insert(user);
  if (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async ({
  id,
  updates,
}: {
  id: string;
  updates: Partial<UserProfile>;
}): Promise<void> => {
  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => queryClient.invalidateQueries('profiles'),
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => queryClient.invalidateQueries('profiles'),
  });
};
