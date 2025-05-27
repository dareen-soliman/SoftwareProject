const jwt = require('jsonwebtoken');

module.exports = function authorizationMiddleware(allowedRoles) {
  return (req, res, next) => {
    try {
      // 1. If user is not already attached, verify token manually
      if (!req.user) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user to request
      }

      // 2. Role checking
      const userRole = req.user.role;
      if (!allowedRoles.includes(userRole)) {
        console.log('User role:', userRole);
        return res.status(403).json({ message: 'Unauthorized access.' });
      }

      // 3. Success
      next();
    } catch (error) {
      console.error('Authorization failed:', error.message);
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  };
};