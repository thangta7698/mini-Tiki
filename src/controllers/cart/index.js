const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const CartHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class CartControllers {
  async addToCart(req, res, next) {
    try {
      const data = DTO.addToCart(req.body);
      const response = await CartHandlers.addToCart(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateCartItem(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateCartItem(_id, req.body);
      const response = await CartHandlers.updateCartItem(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeCartItems(req, res, next) {
    try {
      const _ids = DTO.removeCartItems(req.body);
      const response = await CartHandlers.removeCartItems(_ids);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryCart(req, res, next) {
    try {
      const params = DTO.queryCart(req.query);
      const response = await CartHandlers.queryCart(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new CartControllers();
