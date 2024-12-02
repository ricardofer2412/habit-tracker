import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  frequency: "daily" | "weekly";
  streak: number;
  completeDates: Date[];
}

const HabitSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  streak: { type: Number, default: 0 },
  completedDates: [{ types: Date }],
});

export default mongoose.model<IHabit>("Habit", HabitSchema);
