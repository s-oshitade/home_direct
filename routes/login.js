const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const {getUserByEmail} = require('../helpers');

module.exports = (db) => {
  //Render login form 
  router.get("/", (req, res) => {
    let query = `SELECT * FROM properties LIMIT 12`;
    console.log(query);
    db.query(query)
      .then(data => {
        const properties_user = data.rows;
        res.render("login");

      })
      .catch(err => {
        res.render("error");
      });
  });
  
  router.post("/", (req, res) => {
    // req.session.user_id = user_id //define session, set cookie
    const {email, password} = req.body; //extract info from submitted form
    req.session.email = email;
    console.log("Printing req.body", req.body)
    console.log("Printing req.session", email)
    let query = `
    SELECT * FROM properties
    LIMIT 12`;
    console.log(query);
    db.query(query)
      .then(data => {
        const properties_user = data.rows;
        // res.json({ properties_user });
        res.render("users", {properties_user});

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //For later reference - Use code to look up user by email
  // router.post("/", (req, res) => {
  //   const {email, password} = req.body;
  //   console.log("Printing req.body", email, password)
  //   const userPromise = getUserByEmail(email, db)
  //   const query = `
  //   SELECT * 
  //   FROM properties
  //   LIMIT 12;
  //   `
  //   const propertiesPromise = db.query(query)
  //   Promise.all([userPromise, propertiesPromise])
  //   .then((results) => {
  //     // console.log(results);
  //     const user = results[0];
  //     req.session.user_id = user.id //define session
  //     console.log("USER", user);
  //     const properties = results[1].rows;
  //     console.log("PROPERTIES", properties);
  //     res.render("users", {properties_user: properties, user: user})
  //     // db.query(query)
  //   })
  //   .catch(err => {
  //         res.render('errors', err);
  //       });
  // });
  return router;
};