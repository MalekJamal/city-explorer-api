const axios = require("axios");
const errorHandler = require("./errorHandler");
const weatherCache = {};

async function handleWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  console.log(weatherCache);
  if (weatherCache[searchQuery] !== undefined) {
    res.status(200).send(weatherCache[searchQuery]);
  } else {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    try {
      const weatherApi = await axios.get(url);
      const weatherDay = weatherApi.data.data.map((item) => {
        return new Forecast(item);
      });
      weatherCache[searchQuery] = weatherDay;
      res.status(200).send(weatherDay);
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.descrption = day.weather.description;
  }
}
module.exports = { handleWeather };
