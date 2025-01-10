import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode) {
      setTheme(savedMode);
      applyTheme(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = systemPrefersDark ? "dark" : "light";
      setTheme("system");
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (mode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", systemPrefersDark);
    }
  };

  const handleDarkModeChange = (mode) => {
    localStorage.setItem("darkMode", mode);
    setTheme(mode);
    applyTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleDarkModeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
