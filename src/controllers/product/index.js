const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const ProductHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class ProductControllers {
  async createProduct(req, res, next) {
    try {
      const data = DTO.createProduct(req.body);
      const response = await ProductHandlers.createProduct(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateProduct(_id, req.body);
      const response = await ProductHandlers.updateProduct(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeProduct(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeProduct(_id);
      const response = await ProductHandlers.removeProduct(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryProducts(req, res, next) {
    try {
      const { params, conditions } = DTO.queryProducts(req.query);
      const response = await ProductHandlers.queryProducts(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getOneProduct(req, res, next) {
    try {
      const { slug } = req.params;
      const response = await ProductHandlers.getOneProduct(slug);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new ProductControllers();
