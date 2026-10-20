const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/adminController');
const rateLimit = require('express-rate-limit');

// Max 10 login attempts per IP per 15 minutes — brute-force protection
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, loginAdmin);

module.exports = router;
