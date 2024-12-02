import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Main_Components/Navbar";
import AddHabit from "./components/Main_Components/AddHabbit";
import Dashboard from "./components/Main_Components/Dashboard";
import SignUp from "./components/Auth_Components/SignUp";
import EditHabit from "./components/Main_Components/EditHabit";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        {/* Default route set to Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Other Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/edit-habit/:id" element={<EditHabit />} />
      </Routes>
    </div>
  );
};

export default App;
