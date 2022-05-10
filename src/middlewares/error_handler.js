const { FAIL } = require("../configs/constants");

const errorHandler = (exception, req, res, next) => {
  res.json({
    status: FAIL,
    statusCode: exception.status,
    message: exception.message || "An error has occurred!",
  });
};

module.exports = errorHandler;
