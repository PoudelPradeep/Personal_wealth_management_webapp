// src/context/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: 'logged_in',
    userId: localStorage.getItem('userId'),
  });

  const logout = () => {
    // Optionally call backend logout route
    localStorage.removeItem('userId');
    setAuth({ token: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
