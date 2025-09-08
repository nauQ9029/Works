const jwt = require("jsonwebtoken");

function auth(requiredRole = null) {
  return (req, res, next) => {
    const token = req.cookies?.token;
    console.log(" >>> [DEBUG] Token from cookie:", token);

    if (!token) return res.status(401).send("No token provided");

    try {
      // verifying JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      req.user = decoded;
      console.log(" >>> [DEBUG] Decoded token:", decoded);

      // Checking role-based access control (admin || student)
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).send("Forbidden: Insufficient role");
      }

      next();
    } catch (err) {
      console.error("Token verification error:", err.message);
      res.status(401).send("Invalid token");
    }
  };
}

module.exports = auth;
