import axios from "axios";

export const deleteTask = async (taskId, user, setTasks) => {
  const token = user.token;
  console.log(token)
 

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