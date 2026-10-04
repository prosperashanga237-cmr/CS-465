/**
 * app_server/controllers/travel.js
 *
 * The "traveler" controller. Each exported function handles one route,
 * assembles whatever data that page needs, and renders the matching
 * Handlebars (HBS) view. Keeping this logic here (instead of inline in
 * app.js) is what separates the Controller layer from the Router and
 * View layers in the MVC pattern.
 *
 * Module Three: the Travel page's destination data used to be a
 * hardcoded array right in this file (static data). It was then moved
 * into trips.json and read in dynamically on every request.
 *
 * Module Five: Separation of Concerns. Database access code no longer
 * lives inside app_server at all -- it was already isolated inside
 * app_api (which talks to MongoDB via Mongoose), and this controller
 * now consumes that REST API exactly the way any other client
 * (Angular.js, a mobile app, or an external caller) would: over HTTP,
 * with no direct knowledge of Mongoose, schemas, or the database. This
 * keeps the Express backend, the database layer, and any future
 * front-end client each able to change independently of the others.
 */

const axios = require('axios');

// Base URL for our own REST API. app_api is mounted on this same
// Express server (see app.js), so the app server calls back into its
// own running process over HTTP, just like an external caller would.
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

// Fetches the full trip list from GET /api/trips. Wrapped in try/catch
// so an API or database hiccup doesn't crash the server -- the Travel
// page just renders with an empty list instead, and the error is logged.
async function getTrips() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/trips`);
    return response.data;
  } catch (err) {
    console.error('Could not fetch trips from the API:', err.message);
    return [];
  }
}

// Latest blog teasers shown on the home page.
const blogPosts = [
  {
    title: '2023 Best Beaches Contest Winners',
    date: 'April 02, 2023',
    excerpt:
      'Integer magna leo, posuere et dignissim vitae, porttitor at odio. Pellentesque a metus nec magna placerat volutpat. Nunc nisi mi, elementum sit amet...',
  },
  {
    title: 'Top 10 Diving Spots',
    date: 'May 29, 2023',
    excerpt:
      'Maecenas scelerisque odio quis arcu fringilla malesuada. Nulla facilisi. In libero nulla, fermentum ut pretium ac, pharetra et eros...',
  },
];

// Rooms shown on the Rooms page.
const rooms = [
  {
    name: 'First Class Room',
    image: 'first-class.jpg',
    description:
      'Cras dui sapien, feugiat vitae tristique ut, lobortis tempor orci. Donec pulvinar sagittis metus ut tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    rate: 220,
  },
  {
    name: 'Deluxe Room',
    image: 'deluxe.jpg',
    description:
      'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.',
    rate: 150,
  },
  {
    name: 'Suite Room',
    image: 'suite.jpg',
    description:
      'Sed et augue lorem. In sit amet placerat arcu. Mauris volutpat ipsum ac justo mollis vel vestibulum orci gravida. Vestibulum sit amet porttitor odio. Nulla facilisi. Fusce at pretium felis.',
    rate: 180,
  },
];

// Meals shown on the Meals page.
const meals = [
  {
    name: 'SeaFood Special',
    image: 'seafoods.jpg',
    caption: 'Fried Salmon Special',
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know...",
  },
  {
    name: 'Sumptuous Desserts',
    image: 'desserts.jpg',
    caption: 'Choco Ice Cream Sandwich',
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know...",
  },
  {
    name: 'Buffet',
    image: 'buffet.jpg',
    caption: 'Mixed Buffet',
    description:
      "I'm a product overview. Here you can write more information about your product. Buyers like to know...",
  },
];

// Sidebar lists shown on the News page.
const latestNews = [
  '2023 Best Beaches Contest Winners',
  'Top 10 Diving Spots',
  'Fishing ban to be implemented this year',
  'Lifeguard saves child from drowning',
];

const vacationTips = [
  'What to bring on the beach?',
  'Planning Fun Activities',
  'Diving Checklist',
  'First Aid',
  'How to Build a Sand Castle?',
  'Tanning Tips',
];

exports.index = (req, res) => {
  res.render('index', { title: 'Travlr Getaways', posts: blogPosts });
};

exports.travel = async (req, res) => {
  // trips now comes from our own REST API (GET /api/trips), which in
  // turn reads from MongoDB via Mongoose -- app_server never touches
  // the database directly.
  const trips = await getTrips();
  res.render('travel', { title: 'Travel | Travlr Getaways', trips });
};

exports.rooms = (req, res) => {
  res.render('rooms', { title: 'Rooms | Travlr Getaways', rooms });
};

exports.meals = (req, res) => {
  res.render('meals', { title: 'Meals | Travlr Getaways', meals });
};

exports.news = (req, res) => {
  res.render('news', {
    title: 'News | Travlr Getaways',
    latestNews,
    vacationTips,
  });
};

exports.about = (req, res) => {
  res.render('about', { title: 'About | Travlr Getaways' });
};

exports.contact = (req, res) => {
  res.render('contact', { title: 'Contact | Travlr Getaways' });
};
