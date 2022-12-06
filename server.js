// Import Express
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Handlebars
const hbs = exphbs.create();

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

// Set up middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
});

app.post("/start", (req, res) => {
  res.status(200);
  res.end();
});

app.listen(PORT, (req, res) =>
  console.log(`server live at http://localhost:${PORT}/`)
);
