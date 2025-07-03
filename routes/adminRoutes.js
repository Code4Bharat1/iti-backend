import express from 'express';
import {
  loginOrSignup,
  resetPassword
} from '../controllers/adminAuth.js';

const router = express.Router();

router.post('/login', loginOrSignup);
router.post('/reset-password', resetPassword);

export default router;
