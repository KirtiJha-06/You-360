import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Journal() {
  const [entry, setEntry] = useState("");

  // Animate on load using framer-motion
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-800 via-pink-800 to-fuchsia-900">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl p-8 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-700"
      >
        <h1 className="text-3xl font-bold text-pink-200 mb-2 text-center">
          🧘 Journal & Mood Tracker
        </h1>
        <p className="text-md text-purple-100 mb-6 text-center">
          Write your thoughts or track your mood. AI will help find patterns.
        </p>

        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full h-40 p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder:text-purple-300 transition-all duration-300"
        ></textarea>

        <button
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          💾 Save Entry
        </button>
      </motion.div>
    </div>
  );
} 

