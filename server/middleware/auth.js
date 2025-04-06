const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};