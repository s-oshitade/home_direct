-- SELECT users.name username, users.id userid, users.email, users.is_admin,  
-- FROM favourite_properties JOIN users ON users.id = user_id;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   is_admin BOOLEAN NOT NULL DEFAULT FALSE

-- );
SELECT * from favourite_properties
where user_id = 1;

