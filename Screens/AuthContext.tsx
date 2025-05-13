import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our authentication context state
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Static user credentials for authentication
export const USERS = [
  { email: "admin@123.com", password: "admin123" },
  { email: "guest@123.com", password: "guestpass" },
  { email: "dev@123.com", password: "devmode" },
];

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userEmail: null,
  login: () => false,
  logout: () => {},
});

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap the app and provide auth functionality
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Login function to verify credentials against our static USERS array
  const login = (email: string, password: string): boolean => {
    const user = USERS.find(
      user => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setUserEmail(user.email);
      return true;
    }
    return false;
  };

  // Logout function to clear authentication state
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  // Provide the auth context to child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);