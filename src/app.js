const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/*", (req, res) => {
  res.status(200).json(`https://www.youtube.com/watch?v=bOZT-UpRA2Y`);
});

module.exports = app;
