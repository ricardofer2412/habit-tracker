import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold hover:text-blue-200"
        >
          Habit Tracker
        </Link>

        {/* Links */}
        <div className="flex space-x-6 items-center">
          <Link
            to="/dashboard"
            className="text-lg hover:text-blue-200 dark:hover:text-gray-400"
          >
            Dashboard
          </Link>
          <Link
            to="/add-habit"
            className="text-lg hover:text-blue-200 dark:hover:text-gray-400"
          >
            Add Habit
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="text-2xl hover:text-gray-300 dark:hover:text-gray-500 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
