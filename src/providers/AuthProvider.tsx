import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  session: { user: { id: string; email: string } } | null;
  isLoading: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ user: { id: string; email: string } } | null>({
    user: { id: '1', email: 'demo@example.com' }
  });
  const [isLoading, setIsLoading] = useState(false);

  const signIn = () => {
    setSession({ user: { id: '1', email: 'demo@example.com' } });
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};