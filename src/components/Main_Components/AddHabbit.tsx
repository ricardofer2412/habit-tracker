import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddHabit: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");

  const handleAddHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newHabit = {
      id: Date.now().toString(),
      name,
      frequency,
      streak: 0,
      lastCompleted: "",
    };

    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    localStorage.setItem("habits", JSON.stringify([...storedHabits, newHabit]));
    alert("Habit added successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-5">Add a New Habit</h1>
      <form onSubmit={handleAddHabit} className="space-y-4">
        <input
          type="text"
          placeholder="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
