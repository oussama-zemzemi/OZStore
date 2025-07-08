const authorize = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};

export default authorize;
