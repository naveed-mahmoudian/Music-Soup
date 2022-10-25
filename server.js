// Import Express
const express = require("express");
const app = express();
const PORT = 3001;

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
