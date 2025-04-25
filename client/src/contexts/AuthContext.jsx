import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api'; // Adjust the path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log('User role (from localStorage):', parsedUser.role);
    } else if (authService.isAuthenticated()) {
      // Or fetch from API
      authService.getCurrentUser()
        .then(res => {
          setUser(res.data);
          console.log('User role (from API):', res.data.role);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    authService.logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Easy access hook
export const useAuth = () => useContext(AuthContext);
