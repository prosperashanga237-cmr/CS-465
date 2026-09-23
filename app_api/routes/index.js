/**
 * app_api/routes/index.js
 *
 * REST API routes, mounted at /api in app.js. Kept separate from the
 * app_server routes (which serve the customer-facing HBS pages) so the
 * two concerns -- rendered HTML vs. JSON data -- don't mix.
 */

const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
