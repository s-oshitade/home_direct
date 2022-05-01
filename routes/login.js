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
        // res.render("login", {properties_user}); @TODO - Delete
        res.render("login");

      })
      .catch(err => {
        res.render("error");
      });
  });
  router.post("/", (req, res) => {
    console.log("Printing req.body", req.body)
    let authValue = [req.body.email];
    let authQuery = `SELECT * FROM users
    WHERE email = $1`;

    db.query(authQuery,authValue)
      .then(user => {
        const isAdmin = user.rows[0].is_admin;

        let query = `
          SELECT * FROM properties
          LIMIT 12`;
          console.log(query);
          db.query(query)
            .then(data => {
              const properties_user = data.rows;
              res.render("users", {properties_user, admin: isAdmin});
            })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
   });
  return router;
};
