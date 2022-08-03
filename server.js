"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weatherData = require("./data/weather.json");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Test Server!");
});

app.get("/weather", (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  const cityDataArr = weatherData.find(
    (item) =>
      item.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase()
  );

  try {
    const cityData = cityDataArr.data.map((item) => new Forecast(item));

    res.status(200).send(cityData);
  } catch (error) {
    errorHandler(error, res);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found!!");
});

function errorHandler(error, res) {
  res.status(500).send({ error: "Somthing Wrong!!" });
}
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.descrption = day.weather.description;
  }
}
app.listen(PORT, () => {
  console.log(`Server App Is Running on port : ${PORT}`);
});
