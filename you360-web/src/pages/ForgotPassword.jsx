import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("📧 Reset instructions sent to your email!");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Forgot Password?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Enter your email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white placeholder-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-black font-bold py-2 rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-emerald-300 mt-4">{message}</p>
        )}

        <p className="text-sm text-center text-gray-300 mt-6">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-emerald-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
