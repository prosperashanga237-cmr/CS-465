/**
 * app_api/models/travel.js
 *
 * Defines the Mongoose schema and model for a single Travlr Getaways
 * trip. Every field is required, so Mongoose will reject (with a
 * validation error) any document that is missing one of them -- this is
 * the "validation" piece of the Module Four rubric, enforced by the
 * database layer itself rather than trusted to whatever calls it.
 */

const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Trip code is required'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true,
  },
  length: {
    type: String,
    required: [true, 'Trip length is required'],
  },
  start: {
    type: Date,
    required: [true, 'Trip start date is required'],
  },
  resort: {
    type: String,
    required: [true, 'Resort is required'],
  },
  perPerson: {
    type: String,
    required: [true, 'Price per person is required'],
  },
  image: {
    type: String,
    required: [true, 'Trip image is required'],
  },
  description: {
    type: String,
    required: [true, 'Trip description is required'],
  },
});

// Registers this schema with Mongoose under the model name "trips",
// which Mongoose (by default) maps to a MongoDB collection literally
// named "trips".
mongoose.model('trips', tripSchema);
