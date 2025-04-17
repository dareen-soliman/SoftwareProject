module.exports = function authorizationMiddleware(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return console.log('User role:', userRole),
      res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};