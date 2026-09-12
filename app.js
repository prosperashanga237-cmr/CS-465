/**
 * app.js
 * Module Two - Travlr Getaways
 *
 * Refactored to an MVC architecture. Express now renders dynamic HBS
 * (Handlebars) views instead of serving pre-built HTML files. The
 * "public" folder is still used, but now only for static assets
 * (CSS and images) -- the pages themselves live in app_server/views
 * and are rendered by the traveler controller via app_server/routes.
 */

var express = require('express');
var path = require('path');
var hbs = require('hbs');

var app = express();

// View engine setup: tell Express where the views live and to render
// them with the hbs (Handlebars) engine.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register the header/footer partials so every view can include them
// with {{> header}} and {{> footer}}.
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Serve static assets (CSS, images) from the "public" folder.
app.use(express.static(path.join(__dirname, 'public')));

// Register the application's routes, which map each URL to a function
// on the traveler controller (app_server/controllers/travel.js).
var routes = require('./app_server/routes/index');
app.use('/', routes);

// Set the port the server will listen on.
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('Visit http://localhost:' + port + ' to view the Travlr Getaways site');
});
