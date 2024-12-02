import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text">
      <h1 className="text-2xl font-bold mb-5 text-gray-800 dark:text-dark-text p-4">
        Add a New Habit
      </h1>
      <motion.form
        onSubmit={handleAddHabit}
        className="space-y-4 mx-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-dark-card dark:border-gray-600 dark:text-dark-text focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 dark:bg-dark-card dark:border-gray-600 dark:text-dark-text focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-green-500 dark:bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-800 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Habit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddHabit;
