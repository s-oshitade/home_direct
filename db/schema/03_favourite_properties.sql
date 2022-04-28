
DROP TABLE IF EXISTS favourite_properties CASCADE;
CREATE TABLE favourite_properties (
  id SERIAL PRIMARY KEY NOT NULL,
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
