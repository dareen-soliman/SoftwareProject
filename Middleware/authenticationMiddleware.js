const jwt = require('jsonwebtoken');
<<<<<<< HEAD

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
=======
const secretKey = process.env.JWT_SECRET;

module.exports = function authenticationMiddleware(req, res, next) {
  const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      message: 'No token provided',
      hint: 'Send token in cookies or Authorization header',
    });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        message: 'Invalid token',
        error: error.message,
      });
    }

    req.user = { _id: decoded.id, role: decoded.role };
    next();
  });
>>>>>>> 1c312f2565c803bd53cbc71b71044e3c802ea917
};