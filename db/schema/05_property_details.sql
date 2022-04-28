DROP TABLE IF EXISTS property_details CASCADE;
CREATE TABLE property_details (
  id SERIAL PRIMARY KEY NOT NULL,
  listed_price INTEGER NOT NULL,
  discount_price INTEGER,
  year_built INTEGER,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE
);
