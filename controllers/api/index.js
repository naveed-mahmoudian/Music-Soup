// Imports
const router = require("express").Router();

// Routes
const userRoutes = require("./userRoutes");
const keywordRoutes = require("./keywordRoutes");

// Use Routes
router.use("/users", userRoutes);
router.use("/keywords", keywordRoutes);

module.exports = router;
