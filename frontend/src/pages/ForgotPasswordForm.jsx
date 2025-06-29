
// src/pages/ForgotPasswordForm.jsx
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Send OTP to email
  const handleSendOtp = async () => {
    if (!email) return toast.warning("Enter your email first");
    try {
      setLoading(true);
      await axios.post("http://localhost:1000/api/auth/forgot-password", {
        email,
      });
      toast.success("OTP sent to email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Verify OTP & Reset Password
  const handleResetPassword = async () => {
    if (!otp || !newPassword) return toast.warning("All fields required");
    try {
      setLoading(true);
      await axios.post("http://localhost:1000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successful");
      onBack(); // go back to login
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!otpSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={handleResetPassword}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}

      {/* Back to Login */}
      <p
        className="text-sm text-center text-blue-600 mt-4 cursor-pointer hover:underline"
        onClick={onBack}
      >
        ← Back to Login
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
