const { ERROR } = require("../configs/constants");
const HttpException = require("./http_exception");
const Logger = require("./logger");

module.exports = (err) => {
  let error = "Server error!";
  if (typeof err === "string") error = err;
  if (err.message) error = err.message;

  Logger.error(error);
  return {
    status: ERROR,
    response: new HttpException(err.status || 500, error),
  };
};
