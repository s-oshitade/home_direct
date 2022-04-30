/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies

// router.use(cookieSession({
//   name: 'session',
//   keys: ["key1", "key2"],
// }));

// module.exports = (db) => {
//   // Generic Login Without an ID
//   router.get("/login", (req, res) => {

//     //Initialize a cookie session
//     req.session.user_id = 1;

//     res.redirect('/'); // Redirect to home page
//   })

//   // Login user with specific ID
//   router.get("/login/:id", (req, res) => {

//     //Fetch user from database
//     req.session.user_id = req.params.id;
//        db.query(`SELECT * FROM users
//        WHERE id = ${req.params.id};`) // Fetch user id from url
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   })

//   // Logout user and delete user_id cookie
//   router.get("/logout", (req, res) => {
//   req.session = null;
//   res.redirect('/'); // Redirect to home page
// }) ;

//   ;
//   return router;
// };

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM properties LIMIT 12`;
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
  return router;
};