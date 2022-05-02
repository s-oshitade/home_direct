// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const cookieSession = require('cookie-session');
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ["key1"],
  maxAge: 24 * 60 * 60 * 1000 
}));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin")
const propertiesRoutes = require("./routes/properties");
const contactRoutes = require("./routes/contact");
const errorRoutes = require("./routes/error");
const widgetsRoutes = require("./routes/widgets");
const loginRoutes = require("./routes/login");
const favsRoutes = require("./routes/favs");

// Mount all resource routes

// app.use("/users", usersRoutes(db));// Only line 62 should remain as /
app.use("/admin", adminRoutes(db));
app.use("/properties", propertiesRoutes(db));
app.use("/login", loginRoutes(db))
app.use("/login/:userID", usersRoutes(db))
app.use("/contact", contactRoutes(db));
app.use("/error", errorRoutes(db));
app.use("/favs", favsRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => { //62
  // console.log(req.session.user_id);
  let query = `SELECT * FROM properties WHERE featured is TRUE LIMIT 6`;
  db.query(query)
    .then(data => {
      const featuredProperties = data.rows;
      res.render('index', { featuredProperties });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
