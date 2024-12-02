import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AddHabit: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [showPopup, setShowPopup] = useState(false);

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

    // Show the popup
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <motion.div
      className="min-h-screen bg-dark-bg text-dark-text flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Popup Notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            🌟 New Habit Added! Keep building those streaks! 🎯
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Title */}
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✨ Add a New Habit ✨
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleAddHabit}
        className="w-full max-w-md bg-dark-card p-6 rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-lg font-semibold mb-2 text-gray-300"
          >
            Habit Name 📝
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Morning Walk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded-lg bg-dark-bg text-dark-text focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="frequency"
            className="block text-lg font-semibold mb-2 text-gray-300"
          >
            Frequency 🔁
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}
            className="w-full p-3 border border-gray-600 rounded-lg bg-dark-bg text-dark-text focus:ring-2 focus:ring-purple-600 outline-none"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-purple-600 text-white py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Habit 🚀
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddHabit;
