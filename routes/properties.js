const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // Fetch all the properties from the database
  router.get("/properties", (req, res) => {
    let queryString = `SELECT properties.*, images.* FROM properties
    JOIN images ON properties.id = images.property_id `;
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
  return router;
};

