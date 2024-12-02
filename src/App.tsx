import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Main_Components/Navbar";
import AddHabit from "./components/Main_Components/AddHabbit";
import Dashboard from "./components/Main_Components/Dashboard";
import Login from "./components/Auth_Components/Login";
import ProtectedRoute from "./components/Auth_Components/ProtectedRoute";
import SignUp from "./components/Auth_Components/SignUp";
import EditHabit from "./components/Main_Components/EditHabit";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
          // element={
          //   <ProtectedRoute>
          //     <Dashboard />
          //   </ProtectedRoute>
          // }
        />
        <Route
          path="/add-habit"
          element={
            <ProtectedRoute>
              <AddHabit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-habit/:id"
          element={
            <ProtectedRoute>
              <EditHabit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
