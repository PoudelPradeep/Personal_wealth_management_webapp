// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token)
    return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // { userId: ... }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
