const propertySearch = function (options,db) {
  let queryString = `SELECT properties.*, images.*,users.* FROM properties
  JOIN images ON properties.id = images.property_id
  JOIN users ON users.id = properties.owner_id `;
  const queryParams = [];
  if (options.city) {
    // When a user types options.city name in lowercase change the first letter to uppercase
    options.city = options.city.charAt(0).toUpperCase() + options.city.substring(1, options.city.length).toLowerCase();
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE properties.city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price && options.maximum_price) {
    queryParams.push(`${options.minimum_price}`);
    queryParams.push(`${options.maximum_price}`);
    queryString += `AND properties.price BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
  }
  if (options.minimum_price && !options.maximum_price) {
    queryParams.push(`${options.minimum_price}`);
    queryString += `AND properties.price >= $${queryParams.length} `;
  }
  if (!options.minimum_price && options.maximum_price) {
    queryParams.push(`${options.maximum_price}`);
    queryString += `AND properties.price < $${queryParams.length} `;
  }
  if (options.number_of_bedrooms && options.number_of_bathrooms) {
    queryParams.push(`${options.number_of_bedrooms}`);
    queryParams.push(`${options.number_of_bathrooms}`);
    queryString += `AND properties.number_of_bedrooms= $${queryParams.length - 1} AND properties.number_of_bathrooms=$${queryParams.length} `;
  }
  if (options.number_of_bedrooms && !options.number_of_bathrooms) {
    queryParams.push(`${options.number_of_bedrooms}`);
    queryString += `AND properties.number_of_bedrooms = $${queryParams.length} `;
  }
  if (!options.number_of_bedrooms && options.number_of_bathrooms) {
    queryParams.push(`${options.number_of_bathrooms}`);
    queryString += `AND properties.number_of_bathrooms = $${queryParams.length} `;
  }
  queryString += `
  ORDER BY properties.price;`;
  return db.query(queryString, queryParams)
};
exports.propertySearch = propertySearch;