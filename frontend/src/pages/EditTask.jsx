// src/pages/EditTask.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EditTask = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTitle(res.data.title);
        setStatus(res.data.status);
        setLoading(false);
      } catch (err) {
        setError("Failed to load task");
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, user.token]);

  // Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:1000/api/tasks/${id}`,
        { title, status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          placeholder="Task Title"
          className="w-full border p-2 rounded"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
