import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const UserEntry = mongoose.model("UserEntry", entrySchema);

export default UserEntry;
