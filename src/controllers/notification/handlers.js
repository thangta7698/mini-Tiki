const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const NotificationModel = require("../../models/notification.model");

class NotificationHandlers {
  async createNotification(data) {
    try {
      const result = await NotificationModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create notification!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create notification successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryAllNotifications(params, conditions) {
    try {
      const { limit, start } = conditions;

      const results = await NotificationModel.find(params)
        .skip(start)
        .limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get notifications!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get notifications successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUserNotifications(user_id) {
    try {
      const result = await NotificationModel.find({
        user_id,
      }).sort({ createdAt: -1 });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get notifications!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get notifications successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new NotificationHandlers();
