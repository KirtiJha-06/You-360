const express = require("express");
const {
  getUserProfile,
  createOrUpdateEntry,
  getWellnessData,
  registerUser,
  loginUser,
  forgotPassword, // Added forgotPassword
} = require("../controllers/usercontrol");

const router = express.Router();

// ---------------- ROUTES ----------------

// ✅ Test route
router.get("/test", (req, res) => {
  res.status(200).json({ message: "User test route is working 🚀" });
});

// ✅ Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); // Added forgot-password route

// ✅ Nutrition & Profile routes
router.get("/:id", getUserProfile);
router.post("/:id/entry", createOrUpdateEntry);
router.get("/:id/entries", getWellnessData);

module.exports = router;

