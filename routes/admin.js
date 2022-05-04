const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session'); // For encrypted cookies
const { route } = require('express/lib/application');
const req = require('express/lib/request');
const res = require('express/lib/response');
const nodemailer = require('nodemailer');

router.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],
}));

module.exports = (db) => {

  router.post("/admin/add_form", (req, res) => {
    res.render("adminAdd");
  })
  // Fetch all the properties from the database
  router.get("/admin/:id", (req, res) => {
    let user = isAdmin(req.params.id, db);
    console.log(user);

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

  router.post("/admin/add", (req, res) => {
    // console.log(req.body)
    const { email } = req.body
    db.query(`SELECT users.id FROM users
WHERE users.email = $1`, [email]).then(data => {
      const owner_id = data.rows[0].id
      let values = [
        owner_id,
        req.body.title,
        req.body.description,
        req.body.area,
        req.body.property_type,
        parseInt(req.body.number_of_bathrooms),
        parseInt(req.body.number_of_bedrooms),
        req.body.cover_image_url,
        req.body.country,
        req.body.city,
        req.body.street,
        req.body.province,
        req.body.post_code,
        parseInt(req.body.price),
        req.body.listing_date
      ]
      let query = `INSERT INTO properties (
        owner_id,
        title,
        description,
        area,
        property_type,
        number_of_bathrooms,
        number_of_bedrooms,
        cover_image_url,
        country,
        city,
        street,
        province,
        post_code,
        price,
        listing_date
      )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING * `;
      db.query(query, values)
        .then((data) => {
          console.log("New Property ID: " + data.rows[0].id);
          let values = [
            req.body.image_url_1,
            req.body.image_url_2,
            req.body.image_url_3,
            req.body.image_url_4,
            data.rows[0].id
          ]

          let query = `INSERT INTO images (
                      image_url_1,
                      image_url_2,
                      image_url_3,
                      image_url_4,
                      property_id
                    )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING * `;
          db.query(query, values)
            .then((data1) => {
              res.redirect("/login");
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    });

  })

  // POST route for delete button
  router.post("/admin/properties/:id/delete", (req, res) => {
    let id = parseInt(req.params.id);
    const values = [id];
    let query = `DELETE FROM properties
    WHERE id = $1`;
    db.query(query, values)
      .then((data) => {
        console.log("ID is = " + id);
        res.redirect(`/login`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    ;
  });

  // POST route to make listing not available (active = False)
  router.post("/admin/properties/:id/sold", (req, res) => {
    let id = parseInt(req.params.id);
    const values = [id];
    let query = `UPDATE properties
    SET active = FALSE
    WHERE id = $1`;
    db.query(query, values)
      .then((data) => {
        console.log("Change the status to sold ");
        res.redirect(`/login`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    ;
  });

  router.post("/admin/message", (req, res) => {
    const { email, subject, message } = req.body


        // create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({

          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
          }
        });
        const mailOptions = {
          from: "homedirect2022@gmail.com",
          to: `${email}`,
          subject: `${subject}`,
          text: `${message}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Message sent: ' + info.response);
          }
        });


        res.redirect('/login');
      })



  return router;
};

