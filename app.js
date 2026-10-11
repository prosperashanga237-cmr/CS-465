/**
 * app.js
 * Module Six - Travlr Getaways
 *
 * This file should already match your Module Five app.js almost exactly.
 * The ONE required change for Module Six is adding express.json() so the
 * server can parse the JSON request bodies the new Angular admin SPA will
 * send on POST (add trip) and PUT (update trip) requests -- GET and DELETE
 * don't need a body, which is why this wasn't needed until now.
 *
 * Everything else (view engine, partials, static assets, app_server routes,
 * app_api routes, the Mongoose connection) is unchanged from Module Five.
 */

var express = require('express');
var path = require('path');
var fs = require('fs');
var hbs = require('hbs');

// Opens the Mongoose connection to MongoDB (using DB_URI from .env)
// and registers the "trips" schema/model used by the API controllers.
require('./app_api/models/db');

var app = express();

// View engine setup: tell Express where the views live and to render
// them with the hbs (Handlebars) engine.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the header/footer partials so every view can include them
// with {{> header}} and {{> footer}}.
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// registerPartials() above scans the partials folder asynchronously. On
// some setups a freshly added file in that folder can lose the race
// against the very first request and come back as "partial not found".
// Registering trip-item explicitly (synchronously) guarantees it is
// always available regardless of that timing.
hbs.registerPartial(
  'trip-item',
  fs.readFileSync(
    path.join(__dirname, 'app_server', 'views', 'partials', 'trip-item.hbs'),
    'utf8'
  )
);

// Module Six: parse incoming JSON request bodies (e.g. the trip object the
// Angular admin SPA sends on POST /api/trips and PUT /api/trips/:tripCode)
// into req.body. Must come before the API routes are registered below.
app.use(express.json());

// Serve static assets (CSS, images) from the "public" folder.
app.use(express.static(path.join(__dirname, 'public')));

// Register the application's routes, which map each URL to a function
// on the traveler controller (app_server/controllers/travel.js).
var routes = require('./app_server/routes/index');
app.use('/', routes);

// Register the JSON REST API routes (app_api) under /api, e.g.
// GET /api/trips and GET /api/trips/:tripCode. Kept separate from the
// "/" routes above so HTML-rendering routes and JSON API routes don't mix.
var apiRoutes = require('./app_api/routes/index');
app.use('/api', apiRoutes);

// Set the port the server will listen on.
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('Visit http://localhost:' + port + ' to view the Travlr Getaways site');
});
