/**
 * app_api/controllers/trips.js
 *
 * REST API controller for the "trips" resource. Each exported function
 * handles one route (see app_api/routes/index.js) and talks to MongoDB
 * through the Trip Mongoose model -- this is the ONLY place in the whole
 * application that touches the database directly (see Module Five's
 * Separation of Concerns refactor: app_server never does).
 *
 * Module Four / Five: tripsList and tripsFindByCode (read-only, GET).
 *
 * Module Six: added tripsAddTrip (POST), tripsUpdateTrip (PUT), and
 * tripsDeleteTrip (DELETE) so the new Angular admin SPA can create, edit,
 * and remove trips through the same REST API that the public, HBS-rendered
 * site already reads from.
 */

const Trip = require('../models/travel');

function toClientShape(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id: obj._id,
    tripCode: obj.code,
    name: obj.name,
    length: obj.length,
    startDate: obj.start,
    resort: obj.resort,
    perPerson: obj.perPerson,
    image: obj.image,
    description: obj.description,
  };
}

exports.tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips.map(toClientShape));
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trips', error: err.message });
  }
};

exports.tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(toClientShape(trip));
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving trip', error: err.message });
  }
};

exports.tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.tripCode,
      name: req.body.name,
      length: req.body.length,
      start: req.body.startDate,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    });
    res.status(201).json(toClientShape(newTrip));
  } catch (err) {
    res.status(400).json({ message: 'Error adding trip', error: err.message });
  }
};

exports.tripsUpdateTrip = async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        name: req.body.name,
        length: req.body.length,
        start: req.body.startDate,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    );
    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json(toClientShape(updatedTrip));
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

exports.tripsDeleteTrip = async (req, res) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!deletedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted', trip: toClientShape(deletedTrip) });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting trip', error: err.message });
  }
};
