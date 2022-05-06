const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { propertySearch } = require('../helpers/property_search');

module.exports = (db) => {

  // Fetch all the properties from the database
 // Fetch all the properties from the database
 router.get("/", (req, res) => {
  let queryString = `SELECT properties.*, images.*,users.* FROM properties
  JOIN images ON properties.id = images.property_id
  JOIN users ON users.id = properties.owner_id;`;
  db.query(queryString)
    .then(data => {
      const properties = data.rows;

      if(req.session.user_id) {
        userLogin = req.session.user_id;
      } else {
        userLogin = undefined;
      }
      res.render("properties", { properties, userLogin});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

  router.get("/search", (req, res) => {
    propertySearch(req.query, db).then(data => {
      const properties = data.rows;
      if(req.session.user_id) {
        userLogin = req.session.user_id;
      } else {
        userLogin = undefined;
      }
      res.render("properties", { properties, userLogin });
    })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // users messages to the property owners
  router.post("/:id/message", (req, res) => {
    const { message } = req.body
    const userEmail = req.body.email
    const queryParam = [req.params.id];
    console.log(userEmail)
    let queryString = `SELECT users.email FROM properties
     JOIN users ON users.id = properties.owner_id
       WHERE properties.id = $1;`;
    db.query(queryString, queryParam)
      .then(data => {
        const ownerEmail = data.rows[0].email;
        console.log(ownerEmail)

        // create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({

          service: 'Mailgun',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        });
        const mailOptions = {
          from: `${userEmail}`,
          to: `${ownerEmail}`,
          subject: 'Property offer',
          text: `${message}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Message sent: ' + info.response);
          }
        });


        res.redirect('/properties');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get("/:id", (req, res) => {
    let value = [req.params.id];
    console.log(req.params.id)
    let queryString = `SELECT properties.*, images.image_url_1 as image_1, images.image_url_2 as image_2,
    images.image_url_3 as image_3, images.image_url_4 as image_4, users.name, users.email
    FROM properties
    JOIN images ON images.property_id = properties.id
    JOIN users ON users.id = properties.owner_id
    WHERE properties.id = $1`;

    db.query(queryString, value)
      .then(data => {
        const properties= data.rows[0];
        if(req.session.user_id) {
          userLogin = req.session.user_id;
        } else {
          userLogin = undefined;
        }

        res.render("individualProperty", { properties, userLogin });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  return router;
};
