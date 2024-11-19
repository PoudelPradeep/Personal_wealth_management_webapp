// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token || '';

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: ... }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
