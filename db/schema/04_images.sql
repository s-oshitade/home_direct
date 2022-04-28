DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  image_url_1 VARCHAR(255),
  image_url_2 VARCHAR(255),
  image_url_3 VARCHAR(255),
  image_url_4 VARCHAR(255),
  property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE
);
