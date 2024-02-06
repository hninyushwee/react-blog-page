import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const intialMode = { mode: "light", click: false };
  const [theme, setTheme] = useState(intialMode);

  //change theme
  const handleTheme = () => {
    if (theme.mode === "light") {
      const changeDark = { mode: "dark", click: true };
      setTheme(changeDark);
      localStorage.setItem("change_theme", JSON.stringify(changeDark));
    } else {
      setTheme(intialMode);
      localStorage.setItem("change_theme", JSON.stringify(intialMode));
    }
  };
  //get theme from local storage
  useEffect(() => {
    const storageTheme = JSON.parse(localStorage.getItem("change_theme"));
    if (storageTheme) {
      setTheme(storageTheme);
    }
  }, []);

  // theme style for css
  const themeStyle = {
    navbar: {
      dark: {
        background: "#1e293bea",
        color: "#ffffffcb",
      },
      light: {
        background: "#404040ea",
        color: "#ffffffcb",
      },
    },
    logo: {
      color: "#fff",
    },
    main: {
      dark: { background: "#334155", color: "#ffffffcb" },
      light: {
        background: "#fefce8",
      },
    },
    home: {
      card1: {
        dark: {
          background: "#1e293bcc",
          color: "#ffffffcb",
        },
        light: {
          background: "#f8f0d0cc",
        },
      },
    },
    card: {
      dark: {
        background: "#1f2937",
        color: "#ffffffcb",
      },
      light: {
        background: "#fff",
      },
    },
    sidebar :{
      light : {
        background : "#fff"
      }
    },
    button: {
      dark: {
        background: "#fed7aa",
        border: "#ffedd5",
        color: "#000",
      },
      light: {
        color: "#fff",
      },
    },
    input: {
      dark: {
        border: "#ffedd5",
      },
    },
    light: {
      color: "#000",
    },
  };
  const value = {
    theme,
    handleTheme,
    themeStyle,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  return useContext(ThemeContext);
};
