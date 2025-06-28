import { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const RegisterForm = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("All fields are required");

    try {
      setLoading(true);
      await axios.post("http://localhost:1000/api/auth/register", {
        name,
        email,
        password,
      });

      setShowOtpField(true);
      setResendTimer(60); // Start timer
    } catch (err) {
      toast.warning(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.info("Please enter OTP");

    try {
      setLoading(true);
      console.log("Sending OTP verify payload:", { email, otp });
      await axios.post("http://localhost:1000/api/auth/verify-otp", {
        email,
        otp,
      });
      

      toast.success("Registered successfully!");
      switchToLogin(); // Go to login modal
    } catch (err) {
      toast.info(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:1000/api/auth/resend-otp", { email });
      toast.success("OTP resent to your email");
      setResendTimer(60); // Reset timer
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={showOtpField ? handleVerifyOtp : handleRegister} className="space-y-4">
      {!showOtpField && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      {showOtpField && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            required
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || loading}
            className={`w-full py-2 rounded ${
              resendTimer > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"
            }`}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Processing..." : showOtpField ? "Verify OTP" : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
