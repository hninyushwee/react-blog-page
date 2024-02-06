import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const ApiDataContext = createContext();
const ApiDataProvider = ({ children }) => {
  const { localUserData } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [category, setCategory] = useState([]);
  const [userDetails, setUserDetails] = useState("");

  // get all user
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  }, [userDetails, setAllUsers]);

  // get category from api
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);
  // get login user details
  useEffect(() => {
    localUserData &&
      axios
        .get(`${import.meta.env.VITE_API_URL}/users/${localUserData}`)
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => console.log(err));
  }, [localUserData]);

  return (
    <ApiDataContext.Provider
      value={{
        allUsers,
        setAllUsers,
        category,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
export default ApiDataProvider;
export const useApiData = () => {
  return useContext(ApiDataContext);
};
