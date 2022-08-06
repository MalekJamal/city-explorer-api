"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const weatherData = require("./data/weather.json");
const axios = require("axios");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Test Server!");
});

app.get("/weather", handleWeather);

app.get("/movies", handleMovies);

async function handleWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
  const weatherApi = await axios.get(url);

  try {
    const weatherDay = weatherApi.data.data.map((item) => {
      return new Forecast(item);
    });

    res.status(200).send(weatherDay);
  } catch (error) {
    errorHandler(error);
  }
}

async function handleMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  const moviesArr = await axios.get(url);

  try {
    const movieInfo = moviesArr.data.results.map((item) => {
      return new Movies(item);
    });
    console.log(movieInfo);
    res.status(200).send(movieInfo);
  } catch (error) {
    errorHandler(error);
  }
}
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
    this.cityName = day.timezone;
  }
}

class Movies {
  constructor(movieInfo) {
    this.title = movieInfo.title;
    this.overview = movieInfo.overview;
    this.average_votes = movieInfo.vote_average;
    this.total_votes = movieInfo.vote_count;
    this.image_url = movieInfo.poster_path;
    this.popularity = movieInfo.popularity;
    this.released_on = movieInfo.release_date;
  }
}
app.listen(PORT, () => {
  console.log(`Server App Is Running on port : ${PORT}`);
});
