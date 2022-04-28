const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Fetch all the properties from the database
  router.get("/properties", (req, res) => {
    let query = `SELECT properties.*, images.* FROM properties
    JOIN images ON properties.id = images.property_id`;
    db.query(query)
      .then(data => {
        const properties = data.rows;
        console.log(properties)

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
