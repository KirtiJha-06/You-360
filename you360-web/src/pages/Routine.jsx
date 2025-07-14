import React from 'react';

export default function Routine() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-emerald-900 text-white p-6 flex items-center justify-center transition-all duration-700 ease-in-out">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20 animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4 text-emerald-300 flex items-center gap-2">
          🧖‍♀️ Your Daily Routine
        </h1>

        <p className="text-white/80 mb-8 text-lg">
          Keep your skincare, haircare, and self-care on track daily!
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-teal-200 mb-2">🌞 Morning Routine</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Cleanser</li>
              <li>Vitamin C Serum</li>
              <li>Moisturizer</li>
              <li>Sunscreen</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-teal-200 mb-2">🌙 Evening Routine</h2>
            <ul className="list-disc list-inside text-white/90 space-y-1">
              <li>Cleanser</li>
              <li>Retinol Serum</li>
              <li>Eye Cream</li>
              <li>Night Moisturizer</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-3 rounded-xl text-white font-semibold shadow-md transition transform hover:scale-105 duration-300">
            ✨ Customize Routine
          </button>
        </div>
      </div>
    </div>
  );
}

