/**
 * app_api/models/member.js
 *
 * Defines the Mongoose schema/model for an admin/member account used to
 * log in to the Travlr Getaways admin SPA. Registered with Mongoose's
 * default connection (opened in app_api/models/db.js) under the
 * collection name "members".
 *
 * Passwords are never stored in plain text. setPassword() hashes the
 * password with bcryptjs (salt + hash) before saving; validatePassword()
 * compares a candidate password against the stored hash at login time.
 * generateJWT() signs a short-lived JSON Web Token used by the Angular
 * admin SPA to authenticate subsequent requests to protected API routes.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  hash: { type: String, required: true },
});

// Hashes and salts the given plain-text password, storing only the hash.
memberSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
};

// Compares a plain-text password against the stored hash. Returns true
// on match, false otherwise. Never throws on a wrong password.
memberSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

// Issues a signed JWT identifying this member, used by the Angular SPA
// to authenticate subsequent requests. Expires after 24 hours so a
// stolen token has a limited window of usefulness.
memberSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = mongoose.model('members', memberSchema);
