/**
 * app_api/models/travel.js
 *
 * Defines the Mongoose schema/model for a single trip document, and
 * registers it with Mongoose's default connection (opened in
 * app_api/models/db.js) under the collection name "trips".
 *
 * This file should already exist in your project from Module Four. It is
 * included here only as a reference so the field names below match exactly
 * what the new CRUD controller methods (Module Six) read and write. If your
 * existing file already has this schema, you do NOT need to replace it.
 */

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true },
  length: String,
  start: String,
  resort: String,
  perPerson: String,
  image: String,
  description: String,
});

module.exports = mongoose.model('trips', tripSchema);
