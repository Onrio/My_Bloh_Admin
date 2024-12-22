import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/supabase';

interface User {
  id: string;
  status: 'user' | 'admin' | null;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      if (sessionData.session) {
        const user = sessionData.session.user;
        const status = user.user_metadata?.status || null;
        setUser({
          id: user.id,
          status: status === 'user' || status === 'admin' ? status : null,
        });
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const status = session.user.user_metadata?.status || null;
          setUser({
            id: session.user.id,
            status: status === 'user' || status === 'admin' ? status : null,
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
