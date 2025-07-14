import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCog } from "react-icons/fa";

export default function Settings() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaCog className="text-purple-300 animate-spin-slow text-2xl" />
          <h2 className="text-2xl md:text-3xl font-bold text-purple-200 text-center">
            Settings & Profile
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-xl hover:scale-105 transition-transform duration-300"
          >
            💾 Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}

