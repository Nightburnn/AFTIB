// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userUpdateObject, setUserUpdateObject] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: new Date(),
    address: "",
    password: "",
    country: "",
    language: "",
    state: ""
  });

  return (
    <UserContext.Provider value={{ userUpdateObject, setUserUpdateObject }}>
      {children}
    </UserContext.Provider>
  );
};
