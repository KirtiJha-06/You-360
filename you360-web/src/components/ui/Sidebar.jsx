import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaSpa,
  FaBook,
  FaCog,
  FaLeaf,
  FaPowerOff,
} from "react-icons/fa";

export default function Sidebar() {
  const links = [
    { to: "/", icon: <FaHome />, label: "Dashboard" },
    { to: "/food-scanner", icon: <FaUtensils />, label: "Food Scanner" },
    { to: "/routine", icon: <FaSpa />, label: "Routine" },
    { to: "/journal", icon: <FaBook />, label: "Journal" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div
      className="fixed top-0 left-0 h-full w-64 z-50 bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-900 text-white shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-emerald-600">
        <FaLeaf className="text-emerald-300 text-xl animate-pulse" />
        <h2 className="text-xl font-bold text-white">You360</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
               ${isActive ? "bg-emerald-600 text-white" : "text-emerald-200 hover:bg-emerald-700 hover:text-white"}`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span className="text-base font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 flex items-center justify-between text-xs text-emerald-200 border-t border-emerald-600">
        <span>© 2025 You360</span>
        <button className="hover:text-white transition">
          <FaPowerOff />
        </button>
      </div>
    </div>
  );
}









