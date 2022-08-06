const axios = require("axios");
const errorHandler = require("./errorHandler");

async function handleWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  try {
    const weatherApi = await axios.get(url);
    const weatherDay = weatherApi.data.data.map((item) => {
      return new Forecast(item);
    });

    res.status(200).send(weatherDay);
  } catch (error) {
    errorHandler(error, res);
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.descrption = day.weather.description;
    this.cityName = day.timezone;
  }
}
module.exports = {handleWeather};
