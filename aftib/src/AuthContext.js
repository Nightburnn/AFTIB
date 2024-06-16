import React, { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from "./Cookie"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for authentication token on component mount
    const token = getCookie('authToken');
    if (token) {
      // Perform additional validation if needed (e.g., validate token with backend)
      // Example validation:
      // fetch('/api/validateToken', {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // })
      // .then(response => {
      //   if (response.ok) {
      //     setUser({ token }); // Set user context with token
      //   } else {
      //     removeCookie('authToken'); // Remove invalid token
      //   }
      // })
      // .catch(error => {
      //   console.error('Error validating token:', error);
      //   removeCookie('authToken');
      // });

      // For simplicity, directly set the user context with the token
      setUser({ token });
    }
  }, []);

  const login = (userData) => {
    const { token } = userData;
    setUser(userData);
    setCookie('authToken', token, { path: '/', maxAge: 3600 }); // Set cookie with token
  };

  const logout = () => {
    setUser(null);
    removeCookie('authToken'); // Remove cookie on logout
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
