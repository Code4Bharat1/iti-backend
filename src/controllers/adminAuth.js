// controllers/admin/authController.js

import Admin from '../../models/Admin.js';
import OTP from '../../models/OTP.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET; // put in .env

// Admin login/signup (combined)
export const loginOrSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    } else {
      const hashed = await bcrypt.hash(password, 10);
      admin = await Admin.create({ email, password: hashed });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Send OTP to email (for forgot password)
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  try {
    await OTP.deleteMany({ email }); // remove old OTPs
    await OTP.create({ email, otp, expiresAt });

    console.log(`OTP sent to ${email}: ${otp}`); // Replace with actual email sending
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Could not send OTP', error: err.message });
  }
};

// Reset password using OTP
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const record = await OTP.findOne({ email, otp });
    if (!record || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await Admin.updateOne({ email }, { password: hashed });
    await OTP.deleteMany({ email }); // Clean up OTPs

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Could not reset password', error: err.message });
  }
};
