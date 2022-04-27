const express = require('express');
const router  = express.Router();


module.exports = () => {
  // Display contact form ejs
  router.get("/", (req, res) => {
   res.send('<h1>Contact Form Here </h1>')
  });
  return router;
};
