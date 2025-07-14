import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserEntry from '../models/userentry.js';
import User from '../models/user.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// ---------------- AUTHENTICATION CONTROLLERS ----------------

// POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = generateToken(newUser._id);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ---------------- NUTRITION & PROFILE CONTROLLERS ----------------

export const createOrUpdateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { calories, protein, carbs, fat } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let entry = await UserEntry.findOne({ userId: id, date: { $gte: today } });

    if (entry) {
      entry.calories = calories;
      entry.protein = protein;
      entry.carbs = carbs;
      entry.fat = fat;
      await entry.save();
    } else {
      entry = new UserEntry({ userId: id, calories, protein, carbs, fat });
      await entry.save();
    }

    res.status(200).json({ message: "Entry saved!", entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getWellnessData = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await UserEntry.find({ userId: id }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- PASSWORD RESET CONTROLLER ----------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found with this email." });
    }

    // Normally you'd generate a reset token & send email
    res.status(200).json({ message: "Password reset instructions sent." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

