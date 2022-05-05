SELECT users.name, users.id userID, users.email, users.is_Admin, favourite_properties.property_id fav_prop_id, favourite_properties.user_id fav_user_id, properties.id property_id, properties.title property_title, properties.price
FROM users
JOIN favourite_properties ON users.id = favourite_properties.user_id
JOIN properties ON properties.id = favourite_properties.property_id
ORDER BY email;
