import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const EditTaskModal = ({ task, onClose, setTasks, user }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    status: task?.status || "pending",
    description: task?.description || "",
  });

  const [showDescription, setShowDescription] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!task?._id) return console.error("Invalid task");

    try {
      const res = await axios.put(
        `http://localhost:1000/api/tasks/${task._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updated = res.data;

if (updated) {
  setTasks((prev) =>
    prev.map((t) => (t._id === task._id ? updated : t))
  );
  onClose(); // close modal
}

    } catch (err) {
      console.error("Update failed:", err?.response?.data || err.message);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <h2 className="text-xl font-bold mb-4">✏️ Edit Task</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowDescription((prev) => !prev)}
            className="text-sm text-indigo-400 underline hover:text-indigo-300"
          >
            {showDescription ? "Hide Description" : "Show Description"}
          </button>

          {showDescription && (
            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditTaskModal;
