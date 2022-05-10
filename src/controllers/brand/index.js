const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const BrandHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class BrandControllers {
  async createBrand(req, res, next) {
    try {
      const data = DTO.createBrand(req.body);
      const response = await BrandHandlers.createBrand(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateBrand(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateBrand(_id, req.body);
      const response = await BrandHandlers.updateBrand(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeBrand(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeBrand(_id);
      const response = await BrandHandlers.removeBrand(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryBrands(req, res, next) {
    try {
      const { params, conditions } = DTO.queryBrands(req.query);

      const response = await BrandHandlers.queryBrands(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new BrandControllers();
