// src/context/UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Define the user interface (optional but helps with type safety)
interface User {
  email: string;
  password: string;
}

// Define the context value type
interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

// Create the context with default value as undefined
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (user: User) => {
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};