// Imports
const router = require("express").Router();

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("home");
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
  } else {
    res.render("signup");
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.logged_in) {
    res.render("dashboard");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
