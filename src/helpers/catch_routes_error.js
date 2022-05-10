const Logger = require("./logger");

module.exports = (err) => {
  let error = "Server error!";
  if (typeof err === "string") error = err;
  if (err.message) error = err.message;

  Logger.error(error);
  return error;
};
