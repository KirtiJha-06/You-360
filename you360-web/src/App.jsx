import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FoodScanner from "./pages/FoodScanner";
import Journal from "./pages/Journal";
import Settings from "./pages/Setting"; // ✅ Import
import Routine from "./pages/Routine";   // ✅ Import
import MainLayout from "./layout/MainLayout";

// Example: Send mood input to backend which sends to AI
const analyzeMood = async (text) => {
  const res = await fetch("http://localhost:5000/api/ai/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  console.log(data.result); // → [{ label: 'POSITIVE', score: 0.98 }]
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Dashboard */}
          <Route
            path="/"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />

          {/* ✅ Food Scanner */}
          <Route
            path="/food-scanner"
            element={
              <MainLayout>
                <FoodScanner />
              </MainLayout>
            }
          />

          {/* ✅ Journal */}
          <Route
            path="/journal"
            element={
              <MainLayout>
                <Journal />
              </MainLayout>
            }
          />

          {/* ✅ Settings */}
          <Route
            path="/settings"
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            }
          />

          {/* ✅ Routine */}
          <Route
            path="/routine"
            element={
              <MainLayout>
                <Routine />
              </MainLayout>
            }
          />

          {/* ✅ Login (no layout wrapper) */}
          <Route path="/login" element={<Login />} />
          {/* ✅ Signup (no layout wrapper) */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


