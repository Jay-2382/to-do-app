// src/pages/CreateTask.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const CreateTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:1000/api/tasks",
        { title, status, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      console.error("Create task error:", err.response?.data || err.message);
      toast.warning(
        "Task creation failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-700 text-white px-4 pt-24">
      <div className="max-w-2xl mx-auto p-8 bg-white/10 rounded-lg shadow-xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create Task</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <input
            type="text"
            placeholder="Enter Task Title"
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Task Description */}
          <textarea
            placeholder="Enter Task Description"
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />

          {/* Status Dropdown */}
          <select
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-700 text-white p-2 rounded w-full transition duration-300"
          >
            ➕ Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
