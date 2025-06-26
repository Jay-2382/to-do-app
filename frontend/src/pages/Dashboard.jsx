import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FilterBar from "../components/Filterbar";
import ConfirmDialog from "../components/ConfirmDialog";
import EditTaskModal from "../components/EditTaskModal";
import { Description } from "./Description";
import TaskCard from "../components/task/TaskCard";
import { AnimatePresence } from "framer-motion";
import deleteTask from "../handlers/deleteTask";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(null); // null | "edit" | "description"
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/tasks", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchTasks();
  }, [user]);

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesTitle && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-950 p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">📝 Task Dashboard</h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => {
              setSelectedTask(task);
              setShowModal("edit");
            }}
            onDelete={() => {
              setSelectedTaskId(task._id);
              setShowConfirm(true);
            }}
            onShowDescription={() => {
              setSelectedTask(task);
              setShowModal("description");
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showModal === "description" && selectedTask && (
          <Description
            task={selectedTask}
            onClose={() => {
              setShowModal(null);
              setSelectedTask(null);
            }}
          />
        )}
        {showModal === "edit" && selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onClose={() => {
              setShowModal(null);
              setSelectedTask(null);
            }}
            setTasks={setTasks}
            user={user}
          />
        )}
      </AnimatePresence>

      <ConfirmDialog
        isOpen={showConfirm}
        message="Are you sure you want to delete this task?"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedTaskId(null);
        }}
        onConfirm={async () => {
          setShowConfirm(false);
          if (selectedTaskId) {
            await deleteTask(selectedTaskId, user, setTasks);
            setSelectedTaskId(null);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
