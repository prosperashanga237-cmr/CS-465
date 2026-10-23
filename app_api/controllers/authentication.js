/**
 * app_api/controllers/authentication.js
 *
 * REST API controller for the "members" resource -- registering a new
 * admin account and logging in. Mirrors the style of
 * app_api/controllers/trips.js: each exported function handles one
 * route (see app_api/routes/index.js) and is the only place that talks
 * to the Member model directly.
 *
 * Both routes are intentionally public (no auth middleware) -- you have
 * to be able to log in before you have a token, and registration is
 * how the very first admin account gets created. Every other /api/trips
 * write route (POST/PUT/DELETE) requires the JWT this controller issues
 * (see app_api/middleware/auth.js and app_api/routes/index.js).
 */

const Member = require('../models/member');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are all required' });
  }

  const member = new Member({ name, email });
  member.setPassword(password);

  try {
    await member.save();
    const token = member.generateJWT();
    res.status(201).json({ token, name: member.name, email: member.email });
  } catch (err) {
    // Mongoose's unique index on email throws a duplicate-key error
    // (code 11000) rather than a validation error.
    if (err.code === 11000) {
      return res.status(409).json({ message: 'An account with that email already exists' });
    }
    res.status(400).json({ message: 'Error registering member', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are both required' });
  }

  try {
    const member = await Member.findOne({ email: email.toLowerCase().trim() });

    // Deliberately identical error message/status for "no such user" and
    // "wrong password" -- confirming which one failed would let an
    // attacker enumerate valid email addresses.
    if (!member || !member.validatePassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = member.generateJWT();
    res.status(200).json({ token, name: member.name, email: member.email });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};
