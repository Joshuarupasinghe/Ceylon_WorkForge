import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

// undefined = we haven’t checked yet
// null      = we checked and there’s no user
// {...}     = logged in user object
export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
      setLoading(false);
    } else if (authService.isAuthenticated()) {
      authService.getCurrentUser()
        .then(res => {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        })
        .catch(() => {
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // not authenticated
      setUser(null);
      setLoading(false);
    }
  }, []);

  const logout = () => {
    authService.logout();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
