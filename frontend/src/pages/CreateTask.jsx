// src/pages/CreateTask.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateTask = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "http://localhost:1000/api/tasks",
        { title, status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/"); // Redirect to Dashboard
    } catch (err) {
  console.error("Create task error:", err.response?.data || err.message);
  alert("Task creation failed: " + (err.response?.data?.message || err.message));
}

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Task Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
          
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
