import User from '../models/userModel.js';
import sendOTPEmail from '../utils/sendOTPEmail.js';
export const resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    console.log("reswnt otp: ",otp);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // ✅ FIX: Use sendOTPEmail instead of generic sendEmail
    await sendOTPEmail(user.email, otp);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};