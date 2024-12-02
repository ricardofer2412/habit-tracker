import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string; // ISO date string
}

const EditHabit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [habit, setHabit] = useState<Habit | null>(null);
  const [name, setName] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch habit details from localStorage
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    const habitToEdit = storedHabits.find((h: Habit) => h.id === id);
    if (habitToEdit) {
      setHabit(habitToEdit);
      setName(habitToEdit.name); // Initialize form with current name
    } else {
      navigate("/dashboard"); // Redirect if habit not found
    }
  }, [id, navigate]);

  const handleSave = () => {
    if (!habit) return;

    // Update the habit's name
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    const updatedHabits = storedHabits.map((h: Habit) =>
      h.id === id ? { ...h, name } : h
    );

    // Save updated habits to localStorage
    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    // Show popup
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/dashboard"); // Redirect back to the dashboard
    }, 3000);
  };

  const handleDelete = () => {
    if (!habit) return;

    // Remove the habit from localStorage
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    const updatedHabits = storedHabits.filter((h: Habit) => h.id !== id);

    // Save updated habits to localStorage
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    navigate("/dashboard"); // Redirect to the dashboard after deletion
  };

  return (
    <motion.div
      className="min-h-screen bg-dark-bg text-dark-text flex items-center justify-center"
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
            transition={{ duration: 0.3 }}
            className="fixed top-10 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50"
          >
            🎉 Habit Updated Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Habit Form */}
      <motion.div
        className="w-full max-w-md bg-dark-card p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">✏️ Edit Habit</h1>
        {habit ? (
          <>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-dark-bg text-dark-text focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              {/* Save Button */}
              <motion.button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-purple-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>

              {/* Cancel Button */}
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>

            <motion.hr
              className="border-gray-600 my-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Delete Button */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:bg-red-600"
              >
                Delete Habit 🗑️
              </button>
            </motion.div>
          </>
        ) : (
          <motion.p
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading habit details... ⏳
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EditHabit;
