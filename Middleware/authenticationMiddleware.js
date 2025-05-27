const jwt = require('jsonwebtoken');
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
  console.log("Decoded JWT payload:", decoded);
  
   req.user = { _id: decoded._id || decoded.id, role: decoded.role };

    next();
  });
};