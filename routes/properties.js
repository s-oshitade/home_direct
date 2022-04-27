const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Fetch all the properties from the database
  router.get("/properties", (req, res) => {
    let query = `SELECT * FROM widgets`;
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
