import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  };

  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);

    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setSummary(calculateSummary(updatedHabits));
    setWeeklyData(calculateWeeklyProgress(updatedHabits));
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
    backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
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
          color: "#d1d5db", // Dark mode text color
        },
      },
      title: {
        display: true,
        text: "Weekly Habit Progress",
        color: "#d1d5db", // Dark mode text color
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#d1d5db", // Dark mode text color
        },
        grid: {
          color: "#374151", // Dark grid lines
        },
      },
      x: {
        ticks: {
          color: "#d1d5db", // Dark mode text color
        },
        grid: {
          color: "#374151", // Dark grid lines
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-dark-text min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-4xl font-bold">Your Habits</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your progress and stay consistent with your daily goals.
            </p>
          </div>
          <Link
            to="/add-habit"
            className="bg-blue-600 dark:bg-dark-card text-white dark:text-gray-200 py-2 px-6 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-gray-700 transition"
          >
            Add New Habit
          </Link>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-gray-700 text-blue-600 rounded-full mr-4">
              <i className="fas fa-list text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Total Habits</h2>
              <p className="text-xl font-bold">{summary.total}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-gray-700 text-green-600 rounded-full mr-4">
              <i className="fas fa-check text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Completed Today</h2>
              <p className="text-xl font-bold">{summary.completedToday}</p>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md mb-8">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Habit Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-2">{habit.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Streak: {habit.streak} days
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => markAsCompleted(habit.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-white ${
                    habit.lastCompleted ===
                    new Date().toISOString().split("T")[0]
                      ? "bg-gray-400 cursor-not-allowed"
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
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {habits.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>No habits added yet. Click "Add New Habit" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
