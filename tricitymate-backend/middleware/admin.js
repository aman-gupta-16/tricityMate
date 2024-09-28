// Middleware to check if the user is an admin
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // User is admin, continue to the next middleware
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
