// src/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateTask from "../pages/CreateTask";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Routes>
      
      <Route path="/" element={<Home />} />


      
      <Route path="/login" element={<Login />} />


      <Route
        path="/create"
        element={
          <PrivateRoute>
            
            <CreateTask />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/create-task"
        element={
          <PrivateRoute>
            <CreateTask />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
