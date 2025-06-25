import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Description } from "./Description";
import { AnimatePresence } from "framer-motion";



const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTask, setSelectedTask] = useState(null); // ✅ ADD
  
const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/tasks", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [user]);

 



  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://localhost:1000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesTitle && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-950 p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">📝 Task Dashboard</h1>

      {/* Filter/Search UI */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded w-full md:w-2/3 bg-gray-800 border border-gray-600 placeholder-gray-400 text-white transition duration-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 rounded w-full md:w-1/3 bg-gray-800 border border-gray-600 text-white transition duration-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none hover:border-indigo-400"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Tasks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 rounded-xl p-5 border border-gray-600 shadow-lg cursor-pointer"
          >
            <h2 className="text-lg font-semibold text-white mb-2">{task.title}</h2>
            <p className="text-sm">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-semibold 
                  ${
                    task.status === "pending"
                      ? "bg-yellow-600 text-yellow-100"
                      : task.status === "in-progress"
                      ? "bg-blue-600 text-blue-100"
                      : "bg-green-600 text-green-100"
                  }`}
              >
                {task.status}
              </span>
            </p>

            {/* Show Description Button */}
            <button
  onClick={(e) => {
    e.stopPropagation();
    setSelectedTask(task);
    setShowModal(true);
  }}
  className="mt-3 mb-2 px-3 py-1 text-sm bg-indigo-700 hover:bg-indigo-600 rounded transition-transform duration-200 hover:scale-105"
>
  Show Description
</button>


            {/* Action Buttons */}
            <div className="mt-4 flex gap-2">
              <Link
                to={`/edit/${task._id}`}
                onClick={(e) => e.stopPropagation()}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transform transition-transform duration-200 hover:scale-105"
              >
                ✏️ Edit
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(task._id);
                }}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transform transition-transform duration-200 hover:scale-105"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <AnimatePresence>
  {showModal && selectedTask && (
    <Description task={selectedTask} onClose={() => setShowModal(false)} />
  )}
</AnimatePresence>

    </div>
  );
};

export default Dashboard;
