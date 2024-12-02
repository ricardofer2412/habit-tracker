import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    navigate("/dashboard"); // Redirect back to the dashboard
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
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text">
      <h1 className="text-3xl font-bold  p-4">Edit Habit</h1>
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-dark-card rounded-lg shadow-md pt-6 m-4">
        {habit ? (
          <>
            <div className="mb-4 pt-2">
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-2 text-gray-700 dark:text-gray-300"
              >
                Habit Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              {/* Save Button */}
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Save Changes
              </button>

              {/* Cancel Button */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 rounded-lg bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>

            <hr className="my-6 border-gray-300 dark:border-gray-700" />

            {/* Delete Button */}
            <div className="text-right">
              <button
                onClick={handleDelete}
                className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Delete Habit
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading habit details...</p>
        )}
      </div>
    </div>
  );
};

export default EditHabit;
