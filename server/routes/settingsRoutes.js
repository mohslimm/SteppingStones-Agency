const express = require('express');
const router = express.Router();
const { getSetting, updateSetting } = require('../controllers/settingsController');
const { protect } = require('../middleware/authMiddleware');

// Public route to check maintenance mode
router.get('/:key', getSetting);

// Protected route to update settings (Admin only)
router.post('/', protect, updateSetting);

module.exports = router;
