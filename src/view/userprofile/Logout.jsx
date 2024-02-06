import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useApiData } from "../../contexts/ApiDataContext";

export const Logout = () => {
  const { theme, themeStyle } = useTheme();
  const { setLocalUserData } = useAuth();
  const { setUserDetails } = useApiData();
  const navigator = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("data_for_user");
    setLocalUserData("");
    setUserDetails("");
    navigator("/", { replace: true });
  };
  return (
    <div className="fixed bg-[#cbd5e163] left-0 w-full top-0 min-h-full ">
      <div
        className="fixed w-60 sm:w-64 md:w-72 lg:w-80 rounded top-[23%] sm:top-[25%] md:top-[28%] lg:top-[30%] left-[23%] sm:left-[33%] md:left-[35%] lg:left-[40%] border shadow-lg border-[#9ca3afa1]"
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
      >
        <div className="px-10 py-6">
          <h1 className="text-center font-bold mb-8">
          Are you sure to want logout?</h1>
          <div className="flex justify-end">
            <button
              className="bg-indigo-600 text-white px-5 py-1 rounded"
              onClick={handleLogout}
            >
              Ok
            </button>
            <button
              className=" ml-4 bg-red-600 text-white px-4 py-1 rounded"
              onClick={() => navigator(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
