/**
 * app_api/models/db.js
 *
 * Database Access Module.
 *
 * This is the one place in the application that knows how to connect to
 * the MongoDB database using Mongoose. Requiring this file (once, from
 * app.js) opens the connection for the whole app and wires up logging
 * and error-handling for the connection's lifecycle events, so a
 * connection problem shows up clearly in the server console instead of
 * failing silently.
 *
 * The actual connection string is never hardcoded here -- it is read
 * from the DB_URI environment variable (see .env.example) so real
 * credentials never end up committed to source control.
 */

require('dotenv').config();

const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;

if (!dbURI) {
  console.error(
    'DB_URI is not set. Create a .env file (see .env.example) with your ' +
      'MongoDB Atlas connection string before starting the server.'
  );
} else {
  mongoose.connect(dbURI).catch((err) => {
    // mongoose.connect() is async -- a rejected promise here means the
    // *initial* connection attempt failed (bad URI, auth failure, no
    // network access, IP not whitelisted in Atlas, etc). The
    // 'error' event below also fires for problems that happen later,
    // after a connection has already been established.
    console.error('Mongoose initial connection error: ' + err.message);
  });
}

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error: ' + err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection cleanly when the Node process is
// stopped (e.g. Ctrl+C in the terminal), rather than leaving the
// connection hanging.
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Load the schema/model definitions so they are registered with
// Mongoose as soon as the database module is required.
require('./travel');

module.exports = mongoose;
