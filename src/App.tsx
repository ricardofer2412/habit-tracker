import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Main_Components/Navbar";
import AddHabit from "./components/Main_Components/AddHabbit";
import Dashboard from "./components/Main_Components/Dashboard";
import SignUp from "./components/Auth_Components/SignUp";
import EditHabit from "./components/Main_Components/EditHabit";
import LandingPage from "./components/Main_Components/LandingPage"; // Import LandingPage

const App: React.FC = () => {
  const location = useLocation();

  // Hide Navbar on Landing Page
  const showNavbar = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Conditionally Render Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Other Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/edit-habit/:id" element={<EditHabit />} />
      </Routes>
    </div>
  );
};

export default App;
