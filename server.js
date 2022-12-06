// Imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");

// Express
const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Sync & Start server with database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`server live at http://localhost:${PORT}/`)
  );
});
