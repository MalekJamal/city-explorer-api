"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weatherData = require("./data/weather.json");
const axios = require("axios");

// require the needed modules
const { handleWeather } = require("./modules/weather");
const handleMovies = require("./modules/movies");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Server!");
});
// end point to weather API
app.get("/weather", handleWeather); // req,res pass by defualt
// end point to movies API
app.get("/movies", handleMovies);

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found!!");
});

app.listen(PORT, () => {
  console.log(`Server App Is Running on port : ${PORT}`);
});
