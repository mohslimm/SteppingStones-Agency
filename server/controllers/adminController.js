const jwt = require('jsonwebtoken');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public (Rate limited)
const loginAdmin = async (req, res) => {
  try {
    const { password } = req.body;
    const adminPass = process.env.ADMIN_PASSWORD || 'SteppingStones2026!';

    if (!password || password !== adminPass) {
      return res.status(401).json({ success: false, error: 'Identifiants invalides.' });
    }

    const secret = process.env.JWT_SECRET || 'steppingstones_fallback_secret_key_2026';
    const token = jwt.sign(
      { role: 'admin', timestamp: Date.now() },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      token,
      message: 'Authentification réussie'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  loginAdmin
};
