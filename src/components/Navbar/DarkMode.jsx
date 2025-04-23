import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkMode = () => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const element = document.documentElement; // html element

  React.useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 transition-colors hover:bg-gray-200 dark:hover:bg-slate-600 ring-1 ring-black/5 dark:ring-white/5"
    >
      <FiSun
        className={`w-5 h-5 text-yellow-500 transition-all duration-300 absolute ${theme === "dark" ? "opacity-0 rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
      <FiMoon
        className={`w-5 h-5 text-slate-300 transition-all duration-300 absolute ${theme === "light" ? "opacity-0 -rotate-180 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
    </button>
  );
};

export default DarkMode;
