const express = require('express');
const router  = express.Router();


module.exports = () => {
  // Display Error page form ejs
  router.get("/", (req, res) => {
   res.send('<h1>Dynamic error message here </h1>')
  });
  return router;
};
