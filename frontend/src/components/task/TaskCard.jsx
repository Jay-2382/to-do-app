const TaskCard = ({ task, onEdit, onDelete, onShowDescription }) => {
  const statusColor =
    task.status === "pending"
      ? "bg-yellow-600 text-yellow-100"
      : task.status === "in-progress"
      ? "bg-blue-600 text-blue-100"
      : "bg-green-600 text-green-100";

  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition duration-300 rounded-xl p-5 border border-gray-600 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-2">{task.title}</h2>

      <p className="text-sm">
        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
          {task.status}
        </span>
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onShowDescription();
        }}
        className="mt-3 mb-2 px-3 py-1 text-sm bg-indigo-700 hover:bg-indigo-600 rounded transition-transform duration-200 hover:scale-105"
      >
        Show Description
      </button>

      <div className="mt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transition-transform duration-200 hover:scale-105"
        >
          ✏️ Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition-transform duration-200 hover:scale-105"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
