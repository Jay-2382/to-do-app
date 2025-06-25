import { Link } from "react-router-dom";

const TaskCard = ({ task, onDelete, onShow }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600 text-yellow-100";
      case "in-progress":
        return "bg-blue-600 text-blue-100";
      case "completed":
        return "bg-green-600 text-green-100";
      default:
        return "";
    }
  };

  return (
    <div
      className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-100 rounded-xl p-5 border border-gray-600 shadow-lg cursor-pointer"
    >
      <h2 className="text-lg font-semibold text-white mb-2">{task.title}</h2>
      <p className="text-sm">
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onShow(task);
        }}
        className="mt-3 mb-2 px-3 py-1 text-sm bg-indigo-700 hover:bg-indigo-600 rounded transition-transform duration-200 hover:scale-105"
      >
        Show Description
      </button>

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
            onDelete(task._id);
          }}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transform transition-transform duration-200 hover:scale-105"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
