import TaskCard from "./TaskCard";

const TaskGrid = ({ tasks, onDelete, onShow }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onShow={onShow}
        />
      ))}
    </div>
  );
};

export default TaskGrid;
