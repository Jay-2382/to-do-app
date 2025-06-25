// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md flex justify-between items-center">
  {/* Left: Logo */}
  <div className="font-bold text-xl hover:text-indigo-400 transition">
    <Link to="/">Task Manager</Link>
  </div>

  {/* Center: Dashboard & Create Task */}
{user && (
  <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
    <Link
      to="/"
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


  {/* Right: Login/Logout */}
  <div>
    {user ? (
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition duration-200 shadow-sm hover:shadow-md text-sm"
      >
        Logout
      </button>
    ) : (
      <Link
        to="/login"
        className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition duration-200 shadow-sm hover:shadow-md text-sm"
      >
        Login
      </Link>
    )}
  </div>
</nav>

  );
};

export default Navbar;
