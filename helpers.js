
const getUserByEmail = function (email, db) {
  //looks up relevant table in db and returns user object
  let query = `
    SELECT * from users
    WHERE users.email = '${email}';
  `
  console.log(query);
  return db.query(query).then(result => {
    const user = result.rows[0];
    return user;
  })
}

module.exports = { getUserByEmail };