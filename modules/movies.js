const axios = require("axios");
const errorHandler = require("./errorHandler");

async function handleMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  try {
    const moviesArr = await axios.get(url);
    const movieInfo = moviesArr.data.results.map((item) => {
      return new Movies(item);
    });
    console.log(movieInfo);
    res.status(200).send(movieInfo);
  } catch (error) {
    errorHandler(error, res);
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
module.exports = handleMovies;
