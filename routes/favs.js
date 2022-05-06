const express = require('express');
const router  = express.Router();
const {getUserByEmail} = require('../helpers/helpers');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let email = req.session.email
    console.log("PRINTING EMAIL FROM FAVS", email);
    let query = `SELECT * FROM properties where id IN (6, 9, 11)`; //update query to use email to lookup property ids from the favourite-properties table AS fav_properties. Then select * from properties table where property id matches the fav_properties. Probably write a subquery.

    console.log(query);
    db.query(query)
      .then(data => {
        const properties_favs = data.rows;
        if(req.session.user_id) {
          userLogin = req.session.user_id;
        } else {
          userLogin = undefined;
        }
        res.render('favs', {properties_favs, userLogin})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
