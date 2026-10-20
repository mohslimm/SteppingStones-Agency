const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : req.cookies?.token || null;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Accès non autorisé : aucun jeton fourni.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'steppingstones_fallback_secret_key_2026';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Jeton invalide ou expiré.' });
  }
};

module.exports = { protect };
