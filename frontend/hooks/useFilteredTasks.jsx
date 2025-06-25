// src/hooks/useFilteredTasks.js

import { useMemo } from "react";

const useFilteredTasks = (tasks, search, statusFilter) => {
  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = statusFilter
        ? task.status === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);
};

export default useFilteredTasks;
