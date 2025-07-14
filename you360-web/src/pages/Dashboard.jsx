import React, { useEffect, useState, useRef } from "react";
import { User, Home, BarChart2, Camera, Dumbbell } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const draggableRef = useRef(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const userId = "686e46305b0b7734c93018dd"; // Replace with real user ID
  const [entry, setEntry] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);

    // ✅ Fetch latest user nutrition entry
    axios
      .get(`http://localhost:5000/api/users/${userId}/entries`)
      .then((res) => {
        setEntry(res.data[0]); // Get the latest entry
      })
      .catch((err) => {
        console.error("Error fetching user entry:", err);
      });

    return () => clearTimeout(timeout);
  }, []);

  // Draggable logic
  const handleMouseDown = (e) => {
    const elem = draggableRef.current;
    const shiftX = e.clientX - elem.getBoundingClientRect().left;
    const shiftY = e.clientY - elem.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      setPosition({ x: pageX - shiftX, y: pageY - shiftY });
    };

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      document.onmouseup = null;
    };
  };

  const handleUpdateIntake = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${userId}/entry`,
        {
          calories: 1850,
          protein: 90,
          carbs: 210,
          fat: 65,
          mood: "Happy",
          steps: 8920,
        }
      );
      alert("Nutrition entry updated successfully!");
      console.log(response.data);

      const res = await axios.get(`http://localhost:5000/api/users/${userId}/entries`);
      setEntry(res.data[0]);
    } catch (err) {
      console.error(err);
      alert("Failed to update intake.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative cursor-[url('/custom-cursor.svg'),_auto] bg-gradient-to-br from-green-900 via-emerald-950 to-slate-950">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-4 md:px-10 py-4 bg-emerald-900 border-b border-emerald-800 shadow-md z-10">
        <h1 className="text-xl md:text-2xl font-bold text-emerald-300 tracking-wide">🍽️ NutriZen</h1>
        <ul className="hidden md:flex gap-6 text-sm items-center">
          <li className="hover:text-yellow-300 transition-all flex items-center gap-1"><Home size={16} /> Home</li>
          <li className="hover:text-yellow-300 transition-all flex items-center gap-1"><Camera size={16} /> Scanner</li>
          <li className="hover:text-yellow-300 transition-all flex items-center gap-1"><BarChart2 size={16} /> Stats</li>
        </ul>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <p className="text-sm text-white">
                Hello, <strong>{user?.name || "User"}</strong>
              </p>
              <button
                onClick={logout}
                className="ml-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="text-sm bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Dashboard Cards */}
      <div className={`transition-all duration-700 ease-out ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} w-full px-4 md:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1440px] mx-auto`}>
        <Card title="Mood" content={<p className="text-2xl md:text-4xl">😊 Happy — You're glowing brighter than your screen!</p>} />

        <Card
          title="Today's Nutrition"
          content={
            <>
              <ul className="text-sm space-y-1">
                <li>Calories: <strong className="text-yellow-300">{entry?.calories || 0}</strong></li>
                <li>Protein: <strong className="text-yellow-300">{entry?.protein || 0}g</strong></li>
                <li>Carbs: <strong className="text-yellow-300">{entry?.carbs || 0}g</strong></li>
                <li>Fat: <strong className="text-yellow-300">{entry?.fat || 0}g</strong></li>
              </ul>
              <button
                onClick={handleUpdateIntake}
                className="mt-4 px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
              >
                Update Intake
              </button>
            </>
          }
        />

        <Card title="Skin & Hair Tip" content={<p className="text-sm">🦁 Your glow is stronger than the sun — but sunscreen still wins today ☀️</p>} />
        <Card title="Your Total Steps" content={<p className="text-2xl md:text-3xl text-emerald-300">🚶‍♂️ {entry?.steps || 0} — Marathon prep or snack quest?</p>} />
        <Card title="Blood Sugar Level" content={<p className="text-2xl md:text-3xl text-pink-300">🩸 105 mg/dL — Sweet, but not too sweet 🍭</p>} />
        <Card title="Blood Pressure" content={<p className="text-2xl md:text-3xl text-purple-300">💓 118/76 mmHg — Smooth like jazz 🎷</p>} />
        <Card title="Meditation" content={<p className="text-lg">🧘 15 min today — Mind like water 💧</p>} />
        <Card title="Breathing Session" content={<p className="text-lg">🌬️ Deep breaths done — You're one inhale away from zen ✨</p>} />
      </div>

      {/* Draggable Widget */}
      <div
        ref={draggableRef}
        onMouseDown={handleMouseDown}
        style={{ position: 'fixed', left: position.x, top: position.y, zIndex: 50 }}
        className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl cursor-move transition hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <Dumbbell className="text-yellow-400 animate-bounce" />
          <h2 className="text-white font-semibold">Fitness Tool</h2>
        </div>
        <p className="text-sm text-gray-300 mt-1">Click + drag to move this pump station 💪</p>
      </div>
    </div>
  );
};

const Card = ({ title, content }) => (
  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transition-transform transform hover:scale-[1.03] hover:border-emerald-300">
    <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
    <div className="text-white">{content}</div>
  </div>
);

export default Dashboard;
