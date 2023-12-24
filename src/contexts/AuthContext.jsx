import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [localUserData, setLocalUserData] = useState(() => {
    const id = localStorage.getItem("data_for_user");
    return Number(id) || "";
  });
  return (
    <AuthContext.Provider
      value={{
        setLocalUserData,
        localUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
