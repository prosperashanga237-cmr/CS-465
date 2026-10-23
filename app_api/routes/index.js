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
 *   GET    /api/trips             -> tripsList           (collection, public)
 *   GET    /api/trips/:tripCode   -> tripsFindByCode      (single resource, public)
 *   POST   /api/trips             -> tripsAddTrip         (protected)
 *   PUT    /api/trips/:tripCode   -> tripsUpdateTrip       (protected)
 *   DELETE /api/trips/:tripCode   -> tripsDeleteTrip        (protected)
 *
 *   POST   /api/register          -> authController.register (public)
 *   POST   /api/login             -> authController.login     (public)
 *
 * GET routes stay public: the customer-facing site (app_server) reads
 * trips through this same API with no login of its own. Only the
 * write routes -- the ones the admin SPA uses to create, edit, or
 * remove a trip -- require a valid JWT (see app_api/middleware/auth.js).
 */

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const requireAuth = require('../middleware/auth');

// Public: anyone can read trips (customer site + admin SPA).
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Protected: only an authenticated admin can create, edit, or delete.
router.post('/trips', requireAuth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', requireAuth, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', requireAuth, tripsController.tripsDeleteTrip);

// Public: logging in is how you get a token in the first place.
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
