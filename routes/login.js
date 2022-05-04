const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies
const properties = require('./properties');

router.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));

module.exports = (db) => {
  router.get("/", (req, res) => {
    let userID =  req.session.user_id;
    console.log("PRINTING userID", userID);
    if(userID) {
    let authValue = [userID];
    let authQuery = `SELECT * FROM users
    WHERE id = $1`;

    db.query(authQuery,authValue)
      .then(user => {
        const isAdmin = user.rows[0].is_admin;
        let query = `
          SELECT * FROM properties ORDER BY properties.id`;

          db.query(query)
            .then(data => {
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

   router.get("/favs", (req, res) => {
    let userID =  req.session.user_id;
    const value = [userID]
    console.log("PRINTING USER FROM FAVS - GET line 62", userID);
     let query = `SELECT * FROM properties
                JOIN favourite_properties ON properties.id = favourite_properties.property_id
                WHERE favourite_properties.user_id = $1;
    `; 
    db.query(query, value)
      .then(data => {
        const properties_favs = data.rows;
        res.render('favs', {properties_favs})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/favs", (req, res) => {
    let userID =  req.session.user_id;
    // console.log("body", req.body)
    // console.log("params", req.params)
    const favId = req.body.favId;
    console.log("PRINTING USER ID FROM FAVS - POST - line 80", userID);
    let value = [userID, favId];
    let query = `INSERT INTO favourite_properties (user_id, property_id)
    VALUES ($1, $2);`; 
    
    console.log(query);
    db.query(query, value)
      .then(data => {
        const properties_favs = data.rows;
        res.render('favs', {properties_favs})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
   router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect('/login');
   })

  return router;
};

