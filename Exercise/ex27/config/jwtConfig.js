const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware: Verifies JWT token from Authorization header.
 * Attaches decoded payload to req.decoded if valid.
 */
exports.verifyUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(403).json({
      message: 'No token provided!',
      expectedHeader: 'Authorization: Bearer <token>'
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Invalid or expired token',
        error: err.message
      });
    }

    // Attach decoded payload to request
    req.decoded = decoded;
    next();
  });
};
