import React from "react";

const getInitialMode = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("dark-mode");
    if (typeof storedPrefs === "boolean") {
      return storedPrefs;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return true;
    }
  }

  // If you want to use dark theme as the default, return 'true' instead
  return false;
};

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs;
    }
  }

  // If you want to use dark theme as the default, return 'true' instead
  return 'defaultTheme';
};

export const themes = ['defaultTheme', 'theme-nord', 'theme-pastel', 'theme-shine'];

export const ThemeContext = React.createContext();
export const DarkModeContext = React.createContext();

export function DarkModeProvider({ initialMode, children }) {
  const [darkMode, setDarkMode] = React.useState(getInitialMode);

  const rawSetMode = (isDark) => {
    const root = window.document.documentElement;

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(isDark ? "dark" : "light");

    localStorage.setItem("dark-mode", isDark);
  };

  if (initialMode) {
    rawSetMode(initialMode);
  }

  React.useEffect(() => {
    rawSetMode(darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export function ThemeProvider({ initialTheme, children }) {
  const [theme, setTheme] = React.useState(getInitialTheme);

  const rawSetTheme = (theme) => {
    const root = window.document.documentElement;

    themes.forEach(t => root.classList.remove(t));

    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
