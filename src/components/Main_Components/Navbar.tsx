import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl font-bold hover:text-blue-200"
          >
            Habit Tracker
          </Link>

          {/* Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-6 items-center">
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

          {/* Hamburger Icon (Visible on Mobile) */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl hover:text-gray-300 dark:hover:text-gray-500 transition"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Sidebar (Only Mobile) */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 shadow-lg z-50 transition-transform transform md:hidden">
          <div className="flex flex-col space-y-6 p-6">
            {/* Close Button */}
            <button
              onClick={toggleSidebar}
              className="self-end text-2xl hover:text-gray-300 dark:hover:text-gray-500 transition"
              aria-label="Close Menu"
            >
              <FiX />
            </button>

            {/* Sidebar Links */}
            <Link
              to="/dashboard"
              onClick={toggleSidebar}
              className="text-lg hover:text-blue-200 dark:hover:text-gray-400"
            >
              Dashboard
            </Link>
            <Link
              to="/add-habit"
              onClick={toggleSidebar}
              className="text-lg hover:text-blue-200 dark:hover:text-gray-400"
            >
              Add Habit
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-lg hover:text-gray-300 dark:hover:text-gray-500 transition flex items-center space-x-2"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <>
                  <FiSun />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FiMoon />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
