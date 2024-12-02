import React from "react";

interface HabitProps {
  habit: {
    id: string;
    name: string;
    streak: number;
  };
}

const HabitCard: React.FC<HabitProps> = ({ habit }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{habit.name}</h2>
      <p className="text-gray-500">Streak: {habit.streak} days</p>
    </div>
  );
};

export default HabitCard;
