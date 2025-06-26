import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const Description = ({ task, onClose }) => {
  // 👇 Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[80vh]"
        initial={{ scale: 0.8, y: -50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">Title: {task.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Description: {task.description}
        </p>
        <button
          className="absolute top-2 right-2 text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Description;
