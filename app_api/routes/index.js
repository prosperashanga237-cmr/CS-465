/**
 * app_api/routes/index.js
 *
 * REST API routes, mounted at /api in app.js. Kept separate from the
 * app_server routes (which serve the customer-facing HBS pages) so the
 * two concerns -- rendered HTML vs. JSON data -- don't mix.
 *
 * Naming convention (standardized across this API): routes use the
 * plural resource name "trips", mirroring the MongoDB collection name,
 * with no verbs in the path -- the HTTP method conveys the action
 * instead. A path parameter is named for exactly what it holds
 * (":tripCode") rather than a generic ":id".
 *
 *   GET    /api/trips             -> tripsList           (collection)
 *   GET    /api/trips/:tripCode   -> tripsFindByCode      (single resource)
 *   POST   /api/trips             -> tripsAddTrip         (Module Six)
 *   PUT    /api/trips/:tripCode   -> tripsUpdateTrip       (Module Six)
 *   DELETE /api/trips/:tripCode   -> tripsDeleteTrip        (Module Six)
 */

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const tripsController = require('../controllers/trips');

router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);
router.post('/trips', tripsController.tripsAddTrip);
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', tripsController.tripsDeleteTrip);

module.exports = router;
