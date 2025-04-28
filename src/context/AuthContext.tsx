// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  needsProfile: boolean;
  signIn: (email: string, remember: boolean) => void;
  completeProfile: (profileData: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [needsProfile, setNeedsProfile]     = useState(false);

  // On mount, load auth & profile state from storage
  useEffect(() => {
    // Try localStorage first, then sessionStorage
    const rawAuth =
      localStorage.getItem('userAuth') ||
      sessionStorage.getItem('userAuth');
    const profileRaw = localStorage.getItem('userProfile');

    const auth = rawAuth ? JSON.parse(rawAuth) : null;
    const prof = profileRaw ? JSON.parse(profileRaw) : null;

    if (auth?.email) {
      setAuthenticated(true);
      setNeedsProfile(!prof);
    }
  }, []);

  // Sign in, with "remember me" flag
  const signIn = (email: string, remember: boolean) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem('userAuth', JSON.stringify({ email }));
    setAuthenticated(true);

    // Profile always persists in localStorage
    const profRaw = localStorage.getItem('userProfile');
    setNeedsProfile(!profRaw);
  };

  // Complete onboarding: save profile and clear the flag
  const completeProfile = (profileData: any) => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setNeedsProfile(false);
  };

  // Sign out: clear auth from both storages, keep profile
  const signOut = () => {
    localStorage.removeItem('userAuth');
    sessionStorage.removeItem('userAuth');
    setAuthenticated(false);
    setNeedsProfile(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        needsProfile,
        signIn,
        completeProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the auth context
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
