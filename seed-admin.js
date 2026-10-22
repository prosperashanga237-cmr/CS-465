/**
 * seed-admin.js
 *
 * Create (or reset the password on) an admin account you can use to log
 * in to the Angular admin SPA at /login.
 *
 * There's no public "sign up" page in the admin SPA on purpose -- a
 * travel booking back office shouldn't let just anyone create an admin
 * account for themselves. Instead, the very first admin account (and
 * any later ones) gets created this way, directly against the
 * database, using the exact same Member model (with the same password
 * hashing) the running app uses -- so the account this script creates
 * logs in exactly the way any account created through POST /api/register
 * would.
 *
 * Run from the project root, after creating your .env file (same one
 * app.js uses -- this script needs both DB_URI and JWT_SECRET to be
 * set, even though it doesn't issue a token itself, because
 * app_api/models/member.js is shared code):
 *
 *   node seed-admin.js "Your Name" you@example.com "YourPassword123!"
 *
 * Safe to re-run with the same email: it updates that account's
 * password instead of failing on the duplicate email, so you can also
 * use this to reset a forgotten password.
 */

const mongoose = require('./app_api/models/db');

const Member = mongoose.model('members');

const [, , name, email, password] = process.argv;

if (!name || !email || !password) {
  console.error('Usage: node seed-admin.js "Your Name" you@example.com "YourPassword123!"');
  process.exit(1);
}

mongoose.connection.once('open', async () => {
  try {
    let member = await Member.findOne({ email: email.toLowerCase().trim() });

    if (member) {
      member.name = name;
      member.setPassword(password);
      await member.save();
      console.log(`Updated existing admin account: ${member.email}`);
    } else {
      member = new Member({ name, email });
      member.setPassword(password);
      await member.save();
      console.log(`Created admin account: ${member.email}`);
    }

    console.log('You can now log in at /login (travlr-admin) with this email and password.');
  } catch (err) {
    console.error('Error creating/updating admin account:', err.message);
  } finally {
    mongoose.connection.close();
  }
});

mongoose.connection.on('error', (err) => {
  console.error('Could not connect to the database: ' + err.message);
  process.exit(1);
});
