import express from 'express';

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  verifyOtp
} from '../controllers/authController.js';

import {resendOTP} from '../utils/resendOTPEmail.js'

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/verify-otp', verifyOtp); // ✅ correct case

router.post('/resend-otp', resendOTP); // ✅ New route


// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

// @route   POST /api/users/logout
router.post('/logout', logoutUser);

// @route   GET /api/users/me (Protected)
router.get('/me', protect, getMe);

export default router;
