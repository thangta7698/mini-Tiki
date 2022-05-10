const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const StatisticHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class StatisticControllers {
  async getStatistic(req, res, next) {
    try {
      const response = await StatisticHandlers.getStatistic();

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new StatisticControllers();
