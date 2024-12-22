import { supabase } from '@/supabase';
import { createContext, PropsWithChildren, useState } from 'react';

type AuthContextType = {
  user: any;
  handleSetUser: (user: any) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>();

  const handleSetUser = (user: any) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
