import mongoose from 'mongoose';

const wellnessEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  mood: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  steps: Number,
  meditationMinutes: Number,
  bloodPressure: String,
  bloodSugar: Number,
});

export default mongoose.model('WellnessEntry', wellnessEntrySchema);
