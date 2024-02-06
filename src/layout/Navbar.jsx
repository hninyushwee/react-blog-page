import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "../contexts/ThemeContext";
import { useApiData } from "../contexts/ApiDataContext";
import { Loading } from "../Loading";
function Navbar() {
  // get props from theme context
  const { theme, handleTheme, themeStyle } = useTheme();
  const [loading, setLoading] = useState(true);
  const { userDetails } = useApiData();
  //get font loading state
  useEffect(() => {
    try {
      setLoading(true);
      const fontLink = document.createElement("link");
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Nova+Square&family=Roboto+Slab&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    } catch (err) {
      console.error("Error get font", err);
    } finally {
      setLoading(false);
    }
  }, []);
  // add css style if navbar active
  const active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#cbd5e163" : "",
      borderRadius: isActive ? "5px" : "0",
    };
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <nav
      className="bg-black flex flex-row justify-between w-full py-2 sm:py-1.5 md:py-1.5 lg:py-1.5 px-5 border-b border-[#9ca3afa1] text-slate-400 fixed"
      style={
        theme.mode === "dark" ? themeStyle.navbar.dark : themeStyle.navbar.light
      }
    >
      <div className="flex items-center gap-2">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/004/753/002/small/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg"
          alt="logo"
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-cover rounded-full shadow-lg shadow-blue-500/50"
        />
        <NavLink
          to="/"
          className="text-lg md:text-xl lg:text-2xl font-bold"
          style={theme.mode === "dark" ? themeStyle.logo : themeStyle.logo}
        >
          Blog
        </NavLink>
      </div>
      <div className="flex items-center text-[15px] sm:text-base md:text-base lg:text-base sm:font-bold md:font-bold lg:font-bold">
        <NavLink
          to="/"
          className="px-1.5 sm:px-2 py-[4px] md:px-2.5 md:py-[4px] lg:px-3 lg:py-[6px] hover:text-blue-400"
          style={active}
        >
          Home
        </NavLink>
        <NavLink
          to="/create_posts"
          className="px-1.5 py-[2px] sm:px-2 sm:py-[4px] md:px-2.5 md:py-[4px] lg:px-3 lg:py-[6px] hover:text-blue-400"
          style={active}
        >
          Create Posts
        </NavLink>
        <div className="px-1.5 md:px-2.5  lg:px-3 border-r md:pr-2 lg:pr-3 border-grey-400 h-full"></div>
        <div className="px-1.5 py-[2px] sm:px-2 sm:py-[4px] md:px-2.5 md:py-[4px] lg:px-3 lg:py-[6px] flex hover:text-blue-400">
          <button onClick={handleTheme}>
            {!theme.click ? (
              <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            ) : (
              <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            )}
          </button>
        </div>
        {userDetails ? (
          <NavLink
            to="/user_profile"
            className="px-1.5 py-[2px] sm:px-2 sm:py-[4px] md:px-2.5 md:py-[4px] lg:px-3 lg:py-[6px] hover:text-blue-400 "
            style={active}
          >
            <div className="flex items-center flex-row">
              <img
                src={userDetails.image}
                alt="userprofile"
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 object-cover rounded-full"
              />
              <p className="pl-2">{userDetails.name}</p>
            </div>
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            className="px-1.5 py-[2px] md:px-2.5 md:py-[4px] lg:px-3 lg:py-[6px] hover:text-blue-400 "
            style={active}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
