const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

module.exports = (db) => {

  // Fetch all the properties from the database
  router.get("/properties", (req, res) => {
    let queryString = `SELECT properties.*, images.*,users.* FROM properties
    JOIN images ON properties.id = images.property_id
    JOIN users ON users.id = properties.owner_id;`;
    db.query(queryString)
      .then(data => {
        const properties = data.rows;

        res.render("properties", { properties });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/properties/search", (req, res) => {
    let queryString = `SELECT properties.*, images.*,users.* FROM properties
    JOIN images ON properties.id = images.property_id
    JOIN users ON users.id = properties.owner_id `;
    const queryParams = [];
    let { city } = req.query

    const { number_of_bedrooms, number_of_bathrooms, minimum_price, maximum_price } = req.query

    if (city) {
      // When a user types city name in lowercase change the first letter to uppercase
      city = city.charAt(0).toUpperCase() + city.substring(1, city.length).toLowerCase();
      queryParams.push(`%${city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }

    if (minimum_price && maximum_price) {
      queryParams.push(`${minimum_price}`);
      queryParams.push(`${maximum_price}`);
      queryString += `AND properties.price BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
    }
    if (minimum_price && !maximum_price) {
      queryParams.push(`${minimum_price}`);
      queryString += `AND properties.price >= $${queryParams.length} `;
    }
    if (!minimum_price && maximum_price) {
      queryParams.push(`${maximum_price}`);
      queryString += `AND properties.price < $${queryParams.length} `;
    }

    if (number_of_bedrooms && number_of_bathrooms) {
      queryParams.push(`${number_of_bedrooms}`);
      queryParams.push(`${number_of_bathrooms}`);
      queryString += `AND properties.number_of_bedrooms= $${queryParams.length - 1} AND properties.number_of_bathrooms=$${queryParams.length} `;
    }

    if (number_of_bedrooms && !number_of_bathrooms) {
      queryParams.push(`${number_of_bedrooms}`);
      queryString += `AND properties.number_of_bedrooms = $${queryParams.length} `;
    }

    if (!number_of_bedrooms && number_of_bathrooms) {
      queryParams.push(`${number_of_bathrooms}`);
      queryString += `AND properties.number_of_bathrooms = $${queryParams.length} `;
    }
    queryString += `
    ORDER BY properties.price;`;

    db.query(queryString, queryParams)
      .then(data => {
        const properties = data.rows;

        res.render("properties", { properties });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // users messages to the property owners
  router.post("/properties/:id/message", (req, res) => {
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

  return router;
};