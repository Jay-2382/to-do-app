

// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm"; // ✅ newly imported
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // ✅ new state

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black backdrop-blur-sm px-4">
      {/* Logo Link */}
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

      {/* Auth Form Card */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-gray-100 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          {isForgotPassword
            ? "Reset Password"
            : isLogin
            ? "Login"
            : "Register"}{" "}
          to To-Do App
        </h1>

        {/* ✅ Conditional Rendering */}
        {isForgotPassword ? (
          <ForgotPasswordForm onBack={() => setIsForgotPassword(false)} />
        ) : isLogin ? (
          <LoginForm
            switchToRegister={() => setIsLogin(false)}
            switchToForgot={() => setIsForgotPassword(true)} // ✅ pass forgot handler
          />
        ) : (
          <RegisterForm switchToLogin={() => setIsLogin(true)} />
        )}

        {/* Switch buttons */}
        {!isForgotPassword && (
          <div className="mt-6 text-center text-sm text-gray-700">
            {isLogin ? (
              <>
                <p className="mb-2">Don't have an account?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-4 py-1.5 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-500 transition duration-300 shadow"
                >
                  Switch to Register
                </button>
              </>
            ) : (
              <>
                <p className="mb-2">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-4 py-1.5 bg-blue-400 text-white font-semibold rounded-full hover:bg-blue-500 transition duration-300 shadow"
                >
                  Switch to Login
                </button>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default login;

