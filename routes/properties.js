const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Fetch all the properties from the database
  router.get("/properties", (req, res) => {
    let query = `SELECT * FROM properties`;
    db.query(query)
      .then(data => {
        const properties = data.rows;
        res.render("properties", { properties });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
