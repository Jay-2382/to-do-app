
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">

      {/* Glowing floating background circles */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.9, 1.2, 0.9] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-[500px] h-[500px] bg-purple-700 opacity-20 rounded-full top-[-120px] left-[-120px] blur-3xl"
      ></motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-[400px] h-[400px] bg-blue-600 opacity-20 rounded-full bottom-[-100px] right-[-100px] blur-3xl"
      ></motion.div>

      {/* Main content */}
      <motion.div
        initial={{ y: -150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 12, duration: 1 }}
        className="z-10 text-center px-6 max-w-2xl bg-white/5 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-700"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow mb-6">
          Master Your Day <br />
          <span className="text-blue-400 drop-shadow-lg">One Task at a Time.</span>
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 font-medium tracking-wide">
          “The secret of getting ahead is getting started.” <br />
          <span className="italic text-gray-400">— Mark Twain</span>
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="mt-10 px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out glow"
        >
          Let's Get Started →
        </motion.button>

        <div className="mt-4 text-sm text-gray-400 tracking-wider">
          🚀 Take control of your time and win every day!
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
