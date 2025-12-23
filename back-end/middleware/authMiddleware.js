const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('AUTH MIDDLEWARE HIT, next type:', typeof next);

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.userId;
    next(); // ✅ this MUST be a function
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
