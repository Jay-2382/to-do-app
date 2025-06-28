import express from 'express';
import {
  registerUser,
  resendOTP,
  verifyOtp,
  logoutUser,
  getMe,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/resend-otp', resendOTP);
router.post('/verify-otp', verifyOtp); 
router.post('/logout', logoutUser);
router.get('/me', getMe);

export default router;
