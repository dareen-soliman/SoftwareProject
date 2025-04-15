const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // 2. Verify token exists
  if (!token) {
    return res.status(401).send('No token provided');
  }

  // 3. Verify token validity
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};