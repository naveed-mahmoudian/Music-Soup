// Imports
const router = require("express").Router();
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!userData) {
      res.status(400).json({ message: "Unable to signup" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.first_name = userData.first_name;
      req.session.last_name = userData.last_name;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json({ message: "Successfully signed up and logged in" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({ message: "Unable to find user" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Invalid password" });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.first_name = userData.first_name;
      req.session.last_name = userData.last_name;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json({ message: "Successfully logged in" });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
