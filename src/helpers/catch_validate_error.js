const HttpException = require("./http_exception");
const Logger = require("./logger");

module.exports = (error) => {
  if (error) {
    let errorMessage = error.details.map((err) => err.message).join(" / ");

    Logger.error(errorMessage);
    throw new HttpException(400, errorMessage);
  }
};
