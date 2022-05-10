const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const SignHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class SignControllers {
  async verify(req, res, next) {
    try {
      const data = DTO.verify(req.params);
      const response = await SignHandlers.verify(data);
      
      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async login(req, res, next) {
    try {
      const data = DTO.login(req.body);
      const response = await SignHandlers.login(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new SignControllers();
