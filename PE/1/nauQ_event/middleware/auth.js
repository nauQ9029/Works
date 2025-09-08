const jwt = require("jsonwebtoken");

function auth(requiredRole = null) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      req.user = decoded;

      // If a specific role is required
      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

module.exports = auth;
