import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  BarChart2,
  Calendar as CalendarIcon,
  Kanban,
  Table,
  Settings as SettingsIcon,
} from "lucide-react";

import Dashboard from "./pages/dashboard";
import Calendar from "./pages/calender";
import Charts from "./pages/charts";
import KanbanPage from "./pages/kanban";
import Tables from "./pages/tables";
import Settings from "./pages/settings";

function App() {
  const [colorTheme, setColorTheme] = useState("slate");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("colorTheme");
    if (savedTheme) setColorTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  const sidebarBgClasses = {
    slate: "bg-slate-400",
    indigo: "bg-indigo-400",
    emerald: "bg-emerald-400",
    rose: "bg-rose-400",
    violet: "bg-violet-400",
  };

  const mainBgClasses = {
    slate: "bg-gray-100",
    indigo: "bg-indigo-50",
    emerald: "bg-emerald-50",
    rose: "bg-rose-50",
    violet: "bg-violet-50",
  };

  return (
    <Router>
      <div
        className={`md:hidden flex items-center justify-between px-4 py-3 ${
          sidebarBgClasses[colorTheme]
        } text-white`}
      >
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        className={`flex flex-col md:flex-row min-h-screen ${
          mainBgClasses[colorTheme] || "bg-gray-100"
        } text-gray-900`}
      >
        
        <aside
  className={`z-50 w-64 p-6 font-sans md:relative md:block ${
    sidebarBgClasses[colorTheme]
  } text-white ${sidebarOpen ? "block" : "hidden"} md:h-auto`}
>

         
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h1 className="text-2xl font-bold">Menu</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
              className="text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link
              to="/charts"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <BarChart2 className="w-5 h-5" /> Charts
            </Link>
            <Link
              to="/calendar"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <CalendarIcon className="w-5 h-5" /> Calendar
            </Link>
            <Link
              to="/kanban"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Kanban className="w-5 h-5" /> Kanban
            </Link>
            <Link
              to="/tables"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <Table className="w-5 h-5" /> Tables
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 hover:bg-white hover:text-black rounded px-3 py-2"
              onClick={() => setSidebarOpen(false)}
            >
              <SettingsIcon className="w-5 h-5" /> Settings
            </Link>
          </nav>
        </aside>

        
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        
        <main className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard colorTheme={colorTheme} />} />  
            <Route path="/charts" element={<Charts />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route
              path="/kanban"
              element={<KanbanPage colorTheme={colorTheme} />}
            />
            <Route
              path="/tables"
              element={<Tables colorTheme={colorTheme} />}
            />
            <Route
              path="/settings"
              element={
                <Settings
                  colorTheme={colorTheme}
                  setColorTheme={setColorTheme}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
