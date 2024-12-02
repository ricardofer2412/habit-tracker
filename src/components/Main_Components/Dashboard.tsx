import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CiMenuKebab } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string; // ISO date string
}

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [summary, setSummary] = useState({ total: 0, completedToday: 0 });
  const [weeklyData, setWeeklyData] = useState<{ [key: string]: number[] }>({});
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [dopamineMessage, setDopamineMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits") || "[]");
    setHabits(storedHabits);
    setSummary(calculateSummary(storedHabits));
    setWeeklyData(calculateWeeklyProgress(storedHabits));
  }, []);

  const calculateSummary = (habits: Habit[]) => {
    const today = new Date().toISOString().split("T")[0];
    const completedToday = habits.filter(
      (habit) => habit.lastCompleted === today
    ).length;
    return {
      total: habits.length,
      completedToday,
    };
  };

  const calculateWeeklyProgress = (habits: Habit[]) => {
    const today = new Date();
    const daysOfWeek = Array(7)
      .fill(null)
      .map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i));
        return date.toISOString().split("T")[0];
      });

    const progress: { [key: string]: number[] } = {};

    habits.forEach((habit) => {
      const habitProgress = Array(7).fill(0);
      daysOfWeek.forEach((day, index) => {
        if (habit.lastCompleted === day) {
          habitProgress[index] = 1;
        }
      });

      progress[habit.name] = habitProgress;
    });

    return progress;
  };

  const markAsCompleted = (id: string) => {
    const today = new Date().toISOString().split("T")[0];

    const updatedHabits = habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            streak:
              habit.lastCompleted === today ? habit.streak : habit.streak + 1,
            lastCompleted: today,
          }
        : habit
    );

    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setSummary(calculateSummary(updatedHabits));
    setWeeklyData(calculateWeeklyProgress(updatedHabits));

    // Trigger confetti and dopamine message
    setShowConfetti(true);
    setDopamineMessage("🎉 Great job! You’ve just boosted your streak!");
    setTimeout(() => {
      setShowConfetti(false);
      setDopamineMessage(null);
    }, 3000);
  };

  const toggleDropdown = (id: string) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const chartLabels = Array(7)
    .fill(null)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString("en-US", { weekday: "short" });
    });

  const datasets = Object.keys(weeklyData).map((habitName, index) => ({
    label: habitName,
    data: weeklyData[habitName],
    backgroundColor: index % 2 === 0 ? "#9333ea" : "#22c55e", // Purple and Green
  }));

  const chartData = {
    labels: chartLabels,
    datasets,
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#e4e4e7", // Dark mode text color
        },
      },
      title: {
        display: true,
        text: "Weekly Habit Progress",
        color: "#e4e4e7", // Dark mode text color
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#e4e4e7", // Dark mode text color
        },
        grid: {
          color: "#374151", // Dark grid lines
        },
      },
      x: {
        ticks: {
          color: "#e4e4e7", // Dark mode text color
        },
        grid: {
          color: "#374151", // Dark grid lines
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-bg text-dark-text min-h-screen pt-12"
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Dopamine Message */}
      <AnimatePresence>
        {dopamineMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            {dopamineMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-bold">Your Habits</h1>
            <p className="text-gray-400">Track your progress consistently.</p>
          </div>
          <Link
            to="/add-habit"
            className="bg-gradient-to-r mt-4 from-green-500 to-purple-600 text-white py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
          >
            Add New Habit
          </Link>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <motion.div
            className="bg-dark-card p-6 rounded-lg shadow-md flex items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full mr-4">
              <i className="fas fa-list text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Total Habits</h2>
              <p className="text-xl font-bold">{summary.total}</p>
            </div>
          </motion.div>
          <motion.div
            className="bg-dark-card p-6 rounded-lg shadow-md flex items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full mr-4">
              <i className="fas fa-check text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Completed Today</h2>
              <p className="text-xl font-bold">{summary.completedToday}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-dark-card p-6 rounded-lg shadow-md mb-8"
        >
          <Bar data={chartData} options={chartOptions} />
        </motion.div>

        {/* Habit Cards Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {habits.map((habit) => (
            <motion.div
              key={habit.id}
              className="bg-dark-card p-6 rounded-lg shadow-md relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
              <p className="text-gray-400">Streak: {habit.streak} days</p>
              <div className="absolute top-4 right-4">
                <CiMenuKebab
                  className="text-2xl cursor-pointer hover:text-gray-200"
                  onClick={() => toggleDropdown(habit.id)}
                />
                {dropdowns[habit.id] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-32 bg-dark-bg text-gray-200 rounded-lg shadow-md"
                  >
                    <button
                      onClick={() => navigate(`/edit-habit/${habit.id}`)}
                      className="block px-4 py-2 text-left w-full hover:bg-gray-700 rounded-t-lg"
                    >
                      Manage
                    </button>
                  </motion.div>
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={() => markAsCompleted(habit.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    habit.lastCompleted ===
                    new Date().toISOString().split("T")[0]
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={
                    habit.lastCompleted ===
                    new Date().toISOString().split("T")[0]
                  }
                >
                  {habit.lastCompleted ===
                  new Date().toISOString().split("T")[0]
                    ? "Completed Today"
                    : "Mark as Completed"}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {habits.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10"
          >
            <p>No habits added yet. Click "Add New Habit" to get started!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
