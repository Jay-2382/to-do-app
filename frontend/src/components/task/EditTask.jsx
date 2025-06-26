import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const modalBackdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalContent = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

const EditTask = ({ taskId, onClose, onUpdate }) => {
  const [task, setTask] = useState({ title: "", status: "", description: "" });

  useEffect(() => {
    if (taskId) {
      axios
        .get(`http://localhost:5000/api/task/${taskId}`)
        .then((res) => setTask(res.data))
        .catch((err) => console.error(err));
    }
  }, [taskId]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/task/${taskId}`, task);
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      variants={modalBackdrop}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-2xl relative"
        variants={modalContent}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Task</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Status --</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
            >
              Update Task
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditTask;
