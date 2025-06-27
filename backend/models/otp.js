import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Automatically deletes after 5 minutes
  }
});

export default mongoose.model("OTP", otpSchema);
