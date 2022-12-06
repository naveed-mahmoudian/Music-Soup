// Imports
const router = require("express").Router();

// Routes
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");

// Use Routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
