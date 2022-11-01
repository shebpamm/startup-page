import React from "react";
import { HiMoon, HiSun, HiColorSwatch } from "react-icons/hi";
import { ThemeContext, DarkModeContext, themes } from "./ThemeContext";


export const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = React.useContext(DarkModeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      {darkMode === true ? (
        <HiMoon
          onClick={() => setDarkMode(!darkMode)}
          className="text-pale text-5xl cursor-pointer"
        />
      ) : (
        <HiSun
          onClick={() => setDarkMode(!darkMode)}
          className="text-pale text-5xl cursor-pointer"
        />
      )}
    </div>
  );
};

const nextTheme = currentTheme => {
  let index = themes.indexOf(currentTheme) + 1;
  if (index > themes.length - 1) index = 0;

  console.log(index)

  return themes[index];
};

export const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      <HiColorSwatch
        onClick={() => setTheme(nextTheme(theme))}
        className="text-pale text-5xl cursor-pointer"
      />
    </div>
  );
};
