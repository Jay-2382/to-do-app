import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import {motion}  from "framer-motion"

const Navbar = () => {

  const location = useLocation();
  const pathname = window.location.pathname;
  const visiblePaths = [ "/create", "/create-task", "/dashboard"];

  if (!visiblePaths.includes(pathname)) {
    return null;
  }

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
    navigate("/home");
  };
  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center">
      {/* Left: Logo */}
      <div className="font-bold text-xl hover:text-indigo-400 transition">
        <motion.div
  initial={{ y: 0 }}
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 1.4,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  }}
  whileHover={{ scale: 1.1 }}
  className="absolute top-6 left-6"
>
  <Link
    to="/"
    className="text-3xl sm:text-4xl font-bold transition duration-300"
    style={{
      fontFamily: "'Pacifico', cursive",
      background: "linear-gradient(to right, #f43f5e, #6366f1)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Task Manager
  </Link>
</motion.div>

      </div>

      {/* Center: Dashboard & Create Task (only if logged in) */}
      {user && (
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-indigo-500/30 hover:text-white transition duration-300 text-sm md:text-base font-semibold shadow-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/create"
            className="px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-indigo-500/30 hover:text-white transition duration-300 text-sm md:text-base font-semibold shadow-sm"
          >
            Create Task
          </Link>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition duration-200 shadow-sm hover:shadow-md text-sm"
      >
        Logout
      </button>

      {/* Reuse ConfirmDialog for logout */}
      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to logout?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmLogout}
      />
    </nav>
  );
};

export default Navbar;
