const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const OrderItemHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class OrderItemControllers {
  async createOrderItems(req, res, next) {
    try {
      const data = DTO.createOrderItems(req.body);
      const response = await OrderItemHandlers.createOrderItems(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeOrderItems(req, res, next) {
    try {
      const item_ids = DTO.removeCartItem(req.body);
      const response = await OrderItemHandlers.removeOrderItems(item_ids);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryOrderItems(req, res, next) {
    try {
      const params = DTO.queryCart(req.query);
      const response = await OrderItemHandlers.queryOrderItems(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new OrderItemControllers();
