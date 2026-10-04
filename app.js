/**
 * app.js
 * Module Five - Travlr Getaways
 *
 * Refactored to an MVC architecture. Express now renders dynamic HBS
 * (Handlebars) views instead of serving pre-built HTML files. The
 * "public" folder is still used, but now only for static assets
 * (CSS and images) -- the pages themselves live in app_server/views
 * and are rendered by the traveler controller via app_server/routes.
 *
 * Module Four added a MongoDB data layer (via Mongoose) and a JSON
 * REST API (app_api) that sits alongside the existing HBS-rendered
 * app_server routes. Requiring app_api/models/db here opens the
 * Mongoose connection (and registers the "trips" schema) as soon as
 * the server starts.
 *
 * Module Five: Separation of Concerns. app_api is a fully independent
 * top-level application, mounted here at /api, with no code shared
 * between it and app_server beyond this one line. app_server's own
 * controller no longer touches Mongoose or the database directly --
 * it calls GET /api/trips over HTTP just like Angular.js or any other
 * external caller would, which is what lets any of those three kinds
 * of clients be added or swapped later without touching the database
 * layer at all.
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
