const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead } = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

// Max 5 lead submissions per IP per minute — prevents spam/flooding
const leadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: { success: false, error: 'Too many submissions. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.route('/')
  .post(leadLimiter, createLead)
  .get(protect, getLeads);

router.route('/:id')
  .put(protect, updateLead);

module.exports = router;
