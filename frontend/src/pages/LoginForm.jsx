
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginForm = ({ switchToRegister, switchToForgot }) => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.warning("Please fill in all fields");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:1000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      toast.success("Login successful");
    } catch (err) {
      toast.warning(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoComplete="off"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* ✅ Forgot Password Link */}
      <p
        className="text-sm text-center text-blue-600 cursor-pointer hover:underline"
        onClick={switchToForgot}
      >
        Forgot Password?
      </p>
    </form>
  );
};

export default LoginForm;

