const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const CategoryHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class CategoryControllers {
  async createCategory(req, res, next) {
    try {
      const data = DTO.createCategory(req.body);
      const response = await CategoryHandlers.createCategory(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateCategory(_id, req.body);
      const response = await CategoryHandlers.updateCategory(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeCategory(_id);
      const response = await CategoryHandlers.removeCategory(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryCategories(req, res, next) {
    try {
      const { params, conditions } = DTO.queryCategories(req.query);
      const response = await CategoryHandlers.queryCategories(
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
}

module.exports = new CategoryControllers();
