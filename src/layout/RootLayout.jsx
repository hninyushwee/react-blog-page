import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

function RootLayout() {
  const { theme, themeStyle } = useTheme();
  return (
    <div className="font-serif">
      <Navbar />
      <div
        className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 min-h-screen text-xs sm:text-sm md:text-sm lg:text-base w-full"
        style={theme.mode === "dark" ? themeStyle.main.dark : themeStyle.main.light}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
