import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            ChronoHabits
          </Link>

          {/* Links (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
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
          </div>

          {/* Hamburger Icon (Visible on Mobile) */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleSidebar}
            className="md:hidden text-2xl hover:text-gray-300 dark:hover:text-gray-500 transition"
            aria-label="Toggle Menu"
          >
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </nav>

      {/* Sidebar (Only Mobile) */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-64 h-full bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 shadow-lg z-50 transform md:hidden"
      >
        <div className="flex flex-col space-y-6 p-6">
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={toggleSidebar}
            className="self-end text-2xl hover:text-gray-300 dark:hover:text-gray-500 transition"
            aria-label="Close Menu"
          >
            <FiX />
          </motion.button>

          {/* Sidebar Links */}
          <Link
            to="/"
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
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
