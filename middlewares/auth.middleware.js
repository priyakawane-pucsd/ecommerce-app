const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

exports.adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access only' });
  next();
};