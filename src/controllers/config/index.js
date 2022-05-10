const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const ConfigHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class ConfigControllers {
  async updateConfig(req, res, next) {
    try {
      const newData = DTO.updateConfig(req.body);
      const response = await ConfigHandlers.updateConfig(newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryConfig(req, res, next) {
    try {
      const response = await ConfigHandlers.queryConfig();

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new ConfigControllers();
