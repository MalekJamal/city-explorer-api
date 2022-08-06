function errorHandler(error, res) {
  res.status(500).send({ error: "Somthing Wrong!!" });
}

module.exports = errorHandler;
