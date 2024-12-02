import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "../../imgs/hero-image.png"; // Add your hero image
import featureImage1 from "../../imgs/feature1.png";
import featureImage2 from "../../imgs/feature2.png";
import featureImage3 from "../../imgs/feature3.png";

const LandingPage: React.FC = () => {
  return (
    <motion.div
      className="bg-dark-bg text-dark-text min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <header className="bg-dark-card text-dark-text shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            ChronosHabit
          </motion.h1>
          <div className="space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-block"
            >
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-dark-bg border border-dark-text text-dark-text font-semibold rounded-lg hover:bg-dark-card hover:text-white transition"
              >
                Dashboard
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center"
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left md:w-1/2"
        >
          <h2 className="text-4xl font-bold mb-4">
            Build Better Habits, One Step at a Time 👟
          </h2>
          <p className="text-lg text-gray-400 mb-6">
            ChronosHabit helps you track, manage, and celebrate your daily and
            weekly goals with ease. Stay consistent and make progress every day!
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-block"
          >
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-green-600 text-dark-bg font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Try a Demo 🚀
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-0 md:w-1/2"
        >
          <img
            src={heroImage}
            alt="Hero"
            className="rounded-lg shadow-lg w-full"
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-card py-12"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-10">
            Why Choose ChronosHabit? 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark-bg p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={featureImage1}
                alt="Track Progress"
                className="mb-4 mx-auto h-32"
              />
              <h4 className="text-xl font-semibold mb-2">
                Track Your Progress 📊
              </h4>
              <p className="text-gray-400">
                Monitor your daily and weekly habits with detailed analytics.
              </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark-bg p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={featureImage2}
                alt="Build Streaks"
                className="mb-4 mx-auto h-32"
              />
              <h4 className="text-xl font-semibold mb-2">Build Streaks 🔥</h4>
              <p className="text-gray-400">
                Stay consistent and celebrate milestones with streak tracking.
              </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-dark-bg p-6 rounded-lg shadow-md text-center"
            >
              <img
                src={featureImage3}
                alt="Celebrate Wins"
                className="mb-4 mx-auto h-32"
              />
              <h4 className="text-xl font-semibold mb-2">Celebrate Wins 🎉</h4>
              <p className="text-gray-400">
                Enjoy confetti celebrations for every completed goal.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 text-center bg-green-700 text-dark-bg"
      >
        <h3 className="text-3xl font-bold mb-4">Start Your Journey Today 🚀</h3>
        <p className="text-lg mb-6">
          Sign up now and take the first step toward building better habits. 🌈
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-dark-bg text-green-700 font-semibold rounded-lg hover:bg-dark-card transition"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-4 text-center">
        <p>🌟 &copy; 2024 ChronosHabit. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
