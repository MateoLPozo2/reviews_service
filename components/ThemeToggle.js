// components/ThemeToggle.js
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", saved === "dark");
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-2 py-1 border rounded text-xs bg-white text-black dark:bg-black dark:text-white hover:opacity-80"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}