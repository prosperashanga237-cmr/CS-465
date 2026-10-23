/**
 * app_api/middleware/auth.js
 *
 * Express middleware that protects a route behind a valid JSON Web
 * Token. Expects the token in the standard
 *   Authorization: Bearer <token>
 * header, as sent by the Angular admin SPA's auth HTTP interceptor
 * (see travlr-admin/src/app/services/auth-interceptor.ts).
 *
 * On success, the decoded token payload (_id, email, name -- see
 * Member.generateJWT()) is attached to req.auth and the request is
 * allowed to continue. On a missing or invalid/expired token, the
 * request is rejected with 401 before it ever reaches the controller,
 * so unauthenticated callers can never create, modify, or delete data.
 */

const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
