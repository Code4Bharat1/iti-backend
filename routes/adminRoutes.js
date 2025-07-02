import express from 'express';
import {
  adminLoginOrSignup,
  forgotPassword,
  verifyOTP,
  resetPassword
} from '../controllers/admin/authController.js';

const router = express.Router();

router.post('/login', adminLoginOrSignup);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

export default router;
