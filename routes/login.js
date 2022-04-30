const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM properties LIMIT 12`;
    console.log(query);
    db.query(query)
      .then(data => {
        const properties_user = data.rows;
        // res.json({ properties_user });
        res.render("login", {properties_user});

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};