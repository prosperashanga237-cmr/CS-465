/**
 * app.js
 * Module One - Travlr Getaways
 *
 * Sets up a Node.js server using the Express framework.
 * Express serves the static HTML/CSS/image content that lives
 * in the "public" folder so it can be rendered in the browser.
 */

var express = require('express');
var path = require('path');

var app = express();

// Serve all static content (HTML, CSS, images) from the "public" folder.
app.use(express.static(path.join(__dirname, 'public')));

// Set the port the server will listen on.
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('Visit http://localhost:' + port + ' to view the Travlr Getaways site');
});
