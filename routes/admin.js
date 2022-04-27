const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies

router.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));

module.exports = (db) => {
  // Generic Admin Login Without an ID
  router.get("/admin", (req, res) => {

    //Initialize a cookie session
    req.session.user_id = 2;

    res.redirect('/'); // Redirect to home page
  });

  router.post('/edit', (req, res) => {

  });

  router.post('/edit', (req, res) => {

  });

  router.post('/edit', (req, res) => {

  });

  return router;
};
