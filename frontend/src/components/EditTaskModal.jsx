import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const EditTaskModal = ({ task, onClose, setTasks, user }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
  });

  const modalRef = useRef(null);

  // Disable dashboard scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Close modal on outside click
  useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      e.target instanceof Node &&
      document.body.contains(e.target) // ensures click is inside actual DOM
    ) {
      onClose();
    }
  };

  document.addEventListener("pointerdown", handleOutsideClick);
  return () => document.removeEventListener("pointerdown", handleOutsideClick);
}, [onClose]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:1000/api/tasks/${task._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
      onClose();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Modal Background */}
        <motion.div
          className="absolute inset-0 bg-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          className="bg-gradient-to-br dark:bg-gray-900 text-white rounded-md p-6 w-full max-w-3xl z-10 shadow-xl overflow-y-auto max-h-[90vh]"
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100vh", opacity: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">Edit Task</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded resize-none overflow-y-auto transition-all duration-300 max-h-[300px]"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded"
                required
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditTaskModal;
