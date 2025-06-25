// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1000/api/auth/login", form);
      login(res.data);
      navigate("/");
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="block mb-2 p-2 w-full border" />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="block mb-2 p-2 w-full border" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
