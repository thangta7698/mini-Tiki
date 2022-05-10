const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const OrderHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class OrderController {
  async createOrder(req, res, next) {
    try {
      const data = DTO.createOrder(req.body);
      const response = await OrderHandlers.createOrder(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { _id } = req.params;

      const newData = DTO.updateOrder(_id, req.body);
      const response = await OrderHandlers.updateOrder(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async cancelOrder(req, res, next) {
    try {
      const user_id = req.user._id;

      const query = DTO.cancelOrder(req.params);
      const response = await OrderHandlers.cancelOrder(user_id, query);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeOrder(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeOrder(_id);
      const response = await OrderHandlers.removeOrder(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryOrders(req, res, next) {
    try {
      const { params, conditions } = DTO.queryOrders(req.query);
      const response = await OrderHandlers.queryOrders(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryUsersOrdersList(req, res, next) {
    try {
      const params = DTO.queryUserOrdersList(req.query);
      const response = await OrderHandlers.queryUserOrdersList(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getOneOrder(req, res, next) {
    try {
      const { _id } = DTO.getOneOrder(req.params);
      const response = await OrderHandlers.getOneOrder(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new OrderController();
