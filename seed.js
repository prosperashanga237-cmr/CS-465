/**
 * seed.js
 *
 * Populate Database.
 *
 * Reads the sample trip data from data/trips.json and loads it into the
 * "trips" collection in MongoDB, using the same Mongoose connection and
 * schema/model (app_api/models) the running application itself uses --
 * so if a document in the JSON is missing a required field, Mongoose's
 * schema validation will reject it here, the same as it would for any
 * other write to the collection.
 *
 * Run once (from the project root, after creating your .env file) with:
 *   node seed.js
 *
 * Safe to re-run: it clears the trips collection first, so re-running
 * this script just re-seeds the same six trips rather than duplicating
 * them.
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('./app_api/models/db');

const Trip = mongoose.model('trips');

const seedPath = path.join(__dirname, 'data', 'trips.json');
const trips = JSON.parse(fs.readFileSync(seedPath, 'utf8'));

mongoose.connection.once('open', async () => {
  try {
    const deleted = await Trip.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing trip(s).`);

    const inserted = await Trip.insertMany(trips);
    console.log(`Seeded ${inserted.length} trip(s) into the "trips" collection:`);
    inserted.forEach((trip) => console.log(`  - ${trip.code}: ${trip.name}`));
  } catch (err) {
    console.error('Error seeding trips:', err.message);
  } finally {
    mongoose.connection.close();
  }
});

mongoose.connection.on('error', (err) => {
  console.error('Could not connect to the database to seed it: ' + err.message);
  process.exit(1);
});
