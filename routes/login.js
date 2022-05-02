const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies

router.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    let userID =  req.session.user_id
     console.log(userID);

    if(userID) {
    let authValue = [userID];
    let authQuery = `SELECT * FROM users
    WHERE id = $1`;

    db.query(authQuery,authValue)
      .then(user => {
        const isAdmin = user.rows[0].is_admin;
        let query = `
          SELECT * FROM properties
          LIMIT 12`;

          db.query(query)
            .then(data => {
              console.log(data.rows[0]);
              const properties_user = data.rows;
              res.render("users", {properties_user, admin: isAdmin});
            })
          })
          .catch(err => {
            res.render("error");
          });
    } else {
      res.render("login");
    }
  });



  router.post("/", (req, res) => {

    let authValue = [req.body.email];
    let authQuery = `SELECT * FROM users
    WHERE email = $1`;

    db.query(authQuery,authValue)
      .then(user => {
        req.session.user_id = user.rows[0].id;

        res.redirect("/login");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
   });
  return router;
};
