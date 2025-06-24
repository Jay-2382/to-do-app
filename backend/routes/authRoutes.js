import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  logoutUser
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/users/register
router.post('/register', registerUser);

// @route   POST /api/users/login
router.post('/login', loginUser);

// @route   POST /api/users/logout
router.post('/logout', logoutUser);

// @route   GET /api/users/me (Protected)
router.get('/me', protect, getMe);

export default router;
