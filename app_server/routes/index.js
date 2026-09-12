/**
 * app_server/routes/index.js
 *
 * Defines the public-facing routes for the site and maps each one to a
 * handler on the traveler controller. This is the Router piece of the
 * MVC pattern -- it doesn't know how to build a page, it just knows
 * which controller function is responsible for which URL.
 */

const express = require('express');

const router = express.Router();

// Traveler controller -- handles all Travlr Getaways public pages.
const travelController = require('../controllers/travel');

router.get('/', travelController.index);
router.get('/travel', travelController.travel);
router.get('/rooms', travelController.rooms);
router.get('/meals', travelController.meals);
router.get('/news', travelController.news);
router.get('/about', travelController.about);
router.get('/contact', travelController.contact);

module.exports = router;
