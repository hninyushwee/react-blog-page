import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

function ProfileNavbar() {
  const { theme, themeStyle } = useTheme();

  const active = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#fed7aacc" : "",
    };
  };
  return (
    <div className="w-full min-h-screen flex">
      <nav
        style={
          theme.mode === "dark"
            ? themeStyle.navbar.dark
            : themeStyle.sidebar.light
        }
        className="flex flex-col w-1/5 sm:w-1/6 md:w-1/6 lg:w-1/6 items-center text-[15px] sm:text-base md:text-base lg-text-base sm:font-bold md:font-bold lg:font-bold border-r border-[#9ca3afa1]"
      >
        <NavLink
          to="./"
          end
          className="py-3 sm:py-2 md:py-3 lg:py-3 w-full mt-6 text-center" style={active}
        >
          Profile
        </NavLink>
        <NavLink
          className="py-3 sm:py-2 md:py-3 lg:py-3 w-full text-center" style={active}
          to="user_posts" 
          end
        >
          Posts
        </NavLink>
        <NavLink
          to="logout" 
          end
          className="py-3 sm:py-2 lg:py-3 w-full text-center" style={active}
        >
          Logout
        </NavLink>
      </nav>
      <div
        className="w-4/5 sm:w-5/6 md:w-5/6 lg:w-5/6"
      
      >
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileNavbar;
