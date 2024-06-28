import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, getCookie, removeCookie } from "./Cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for authentication token and user data on component mount
    const token = getCookie("authToken");
    const storedUser = JSON.parse(window.localStorage.getItem("user"));
    if (token && storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    const { token } = userData;
    setUser(userData);
    setCookie("authToken", token, { path: "/", maxAge: 3600000 }); // Set cookie with token
    window.localStorage.setItem("user", JSON.stringify(userData)); // Set local storage with user data
  };

  const logout = () => {
    setUser(null);
    removeCookie("authToken"); // Remove cookie on logout
    window.localStorage.removeItem("user"); // Remove local storage on logout
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
