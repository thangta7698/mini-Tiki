const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const NotificationHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class NotificationControllers {
  async createNotification(req, res, next) {
    try {
      const data = DTO.createNotification(req.body);
      const response = await NotificationHandlers.createNotification(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryAllNotifications(req, res, next) {
    try {
      const { params, conditions } = DTO.queryProducts(req.query);
      const response = await NotificationHandlers.queryAllNotifications(
        params,
        conditions
      );

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryUserNotifications(req, res, next) {
    try {
      const { user_id } = DTO.queryUserNotification(req.params);
      const response = await NotificationHandlers.queryUserNotifications(
        user_id
      );

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new NotificationControllers();
