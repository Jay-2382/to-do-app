// src/components/OtpModal.jsx
import { useState, useEffect } from "react";

const OtpModal = ({ email, onVerify, onResend, onClose }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = () => {
    onVerify(otp);
  };

  const handleResend = () => {
    onResend();
    setTimer(30);
    setResendDisabled(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
        <p className="mb-2 text-sm text-gray-600">OTP sent to: {email}</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-center"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2 w-full"
        >
          Verify
        </button>
        <button
          onClick={handleResend}
          disabled={resendDisabled}
          className={`text-sm ${
            resendDisabled ? "text-gray-400" : "text-blue-500 hover:underline"
          }`}
        >
          Resend OTP ({timer})
        </button>
        <button
          onClick={onClose}
          className="mt-4 block text-xs text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
