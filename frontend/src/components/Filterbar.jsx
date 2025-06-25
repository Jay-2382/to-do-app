const FilterBar = ({ search, setSearch, statusFilter, setStatusFilter }) => {
  return (
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
  );
};

export default FilterBar;
