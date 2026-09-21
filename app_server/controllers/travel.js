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
 * hardcoded array right in this file (static data). It now lives in
 * trips.json at the project root and is read in dynamically on every
 * request, which is what lets the page's content change just by
 * editing the JSON file -- no code change or server restart required.
 */

const fs = require('fs');
const path = require('path');

// Absolute path to the JSON data file that backs the Travel page.
const tripsDataPath = path.join(__dirname, '..', '..', 'trips.json');

// Reads and parses trips.json fresh on every call. Wrapped in try/catch
// so a missing or malformed JSON file doesn't crash the server -- the
// Travel page just renders with an empty list instead.
function getTrips() {
  try {
    const raw = fs.readFileSync(tripsDataPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Could not read trips.json:', err.message);
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

exports.travel = (req, res) => {
  // trips is read from trips.json (via getTrips()) instead of a
  // hardcoded array -- this is the dynamic-JSON rendering path.
  const trips = getTrips();
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
