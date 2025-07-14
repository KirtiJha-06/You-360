import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function FoodScanner() {
  const [image, setImage] = useState(null);
  const [foodName, setFoodName] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 text-white relative overflow-hidden transition-all">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-10">
        <h1 className="text-2xl font-extrabold tracking-wide text-emerald-300 animate-pulse">You360 🍽️</h1>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-emerald-400 transition">Dashboard</Link>
          <Link to="/food-scanner" className="hover:text-emerald-400 transition">Food Scanner</Link>
          <div className="w-10 h-10 rounded-full bg-emerald-400 text-black flex items-center justify-center font-bold shadow-inner">A</div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-28 px-6 md:px-0 max-w-3xl mx-auto">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center transition-all duration-500 hover:scale-[1.02] hover:shadow-emerald-500/20 border border-emerald-900/30">
          <h2 className="text-4xl font-extrabold mb-2 text-emerald-300 animate-fade-in drop-shadow-lg">📷 Scan Your Food</h2>
          <p className="text-white/70 mb-6 text-lg">Upload a photo of your meal (UI demo only).</p>

          <label className="cursor-pointer border-2 border-dashed border-emerald-500 px-6 py-4 rounded-xl bg-white/5 hover:bg-emerald-500/10 transition inline-block shadow-md hover:shadow-emerald-400">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            <span className="text-emerald-200 font-semibold">📤 Click to upload</span>
          </label>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter food name (optional)"
              value={foodName}
              onChange={e => setFoodName(e.target.value)}
              className="px-4 py-2 rounded-lg text-black w-2/3"
            />
          </div>

          {image && (
            <div className="mt-6">
              <img src={image} alt="Uploaded meal" className="rounded-xl w-full h-64 object-cover shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out" />
              <p className="mt-4 text-emerald-200 font-semibold text-lg">📸 Image preview loaded</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white/40 mt-16 text-sm animate-fade-in-up">
        ©2025 all right reseved
      </footer>

      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-emerald-500 rounded-full mix-blend-overlay blur-3xl opacity-10 animate-pulse top-20 left-10" />
        <div className="absolute w-96 h-96 bg-green-500 rounded-full mix-blend-overlay blur-3xl opacity-10 animate-ping bottom-20 right-10" />
        <div className="absolute w-60 h-60 bg-teal-400 rounded-full mix-blend-overlay blur-2xl opacity-10 animate-spin-slow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

