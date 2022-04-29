const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies

router.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));

module.exports = (db) => {
  // Fetch all the properties from the database
  router.get("/admin/:id", (req, res) => {
    let user = isAdmin(req.params.id)

    req.session.user_id = req.params.id;
    let query = `SELECT properties.*, images.* FROM properties
    JOIN images ON properties.id = images.property_id`;
    db.query(query)
      .then(data => {
        const properties = data.rows;
        //console.log(properties)
        res.render("adminView", { properties });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post("/admin/properties/:id/delete", (req, res) => {
    let id = parseInt(req.params.id);
    const values = [id];
    let query = `DELETE FROM properties
    WHERE id = $1`;
    db.query(query, values)
      .then((data)=> {
        console.log("ID is = " + id);
        res.redirect(`/admin/${id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    ;
  }) ;

  function isAdmin(id) {
    let userID = [id];
    let userQuery = `SELECT * FROM users
    WHERE id = $1`;
    db.query(userQuery,userID).then(data => {
       if(data.rows[0].is_admin === true) {
         console.log(data.rows[0].is_admin)
         return data.rows[0].is_admin ;
       } else
       {
         console.log("User is not an Admin");
         return false;
       }
    })
   }

  return router;
};



