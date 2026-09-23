/**
 * app_api/controllers/trips.js
 *
 * API Integration.
 *
 * Retrieves trip data from MongoDB (via the Mongoose "trips" model) and
 * returns it as JSON. This is the piece that lets the trip data stored
 * in the database be consumed by something other than the server-rendered
 * HBS views -- an Angular SPA, a mobile app, or a simple fetch() call --
 * which is the point of exposing it as a REST endpoint.
 */

const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET /api/trips
// Returns every trip in the collection as a JSON array.
exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips', error: err.message });
  }
};

// GET /api/trips/:tripCode
// Returns a single trip, looked up by its unique trip code.
exports.tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};
