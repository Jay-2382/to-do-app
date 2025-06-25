import axios from "axios";

export const deleteTask = async (taskId, token, setTasks) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  try {
    await axios.delete(`http://localhost:1000/api/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  } catch (err) {
    console.error("Failed to delete task", err);
  }
};

export default deleteTask