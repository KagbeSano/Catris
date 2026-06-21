// src/contexts/AuthContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../models';

interface AuthContextType {
  user: User | null;
  signIn: (u: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{
      user,
      signIn: (u) => setUser(u),
      signOut: () => setUser(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);