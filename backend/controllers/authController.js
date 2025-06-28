import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import sendOTPEmail from '../utils/sendOTPEmail.js';

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry,
      
    });

    // ✅ Send OTP email
    await sendOTPEmail(email, otp);

    res.status(201).json({
      message: 'User registered. OTP sent to email for verification.',
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};



// @desc    Logout user (optional placeholder)
// @route   POST /api/users/logout
// @access  Public (or just handled on frontend)
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified. Please verify OTP first.' });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};





// @desc    Verify OTP and activate account
// @route   POST /api/users/verify-otp
// @access  Public
export const verifyOtp = async (req, res) => {
  

  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    if (!user.otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    if (user.otp.toString() !== otp.toString()) {
  return res.status(400).json({ message: 'Invalid OTP' });
}


    // OTP is valid
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateToken(user._id); // generate JWT

    res.status(200).json({
      message: 'Email verified successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

