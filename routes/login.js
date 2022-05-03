const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies

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
          SELECT * FROM properties
          LIMIT 12`;

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
    console.log("PRINTING EMAIL FROM FAVS", userID);
    let query = `SELECT * FROM properties where id IN (6, 9, 11)`; //update query to use email to lookup property ids from the favourite-properties table AS fav_properties. Then select * from properties table where property id matches the fav_properties. Probably write a subquery.
    
    console.log(query);
    db.query(query)
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
    let email = req.session.email
    console.log("PRINTING EMAIL FROM FAVS", userID);
    let query = `SELECT * FROM properties where id IN (6, 9, 11)`; //update query to use email to lookup property ids from the favourite-properties table AS fav_properties. Then select * from properties table where property id matches the fav_properties. Probably write a subquery.
    
    console.log(query);
    db.query(query)
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
