const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const ImageHandlers = require("./handlers");
const { ERROR } = require("../../configs/constants");

class ImageControllers {
  async removeProductImage(req, res, next) {
    try {
      const data = DTO.removeImage({
        public_id: req.query.public_id,
      });
      const response = await ImageHandlers.removeProductImage(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async createProductImage(req, res, next) {
    try {
      const data = DTO.createImage(req.body);
      const response = await ImageHandlers.createImage(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getProductImages(req, res, next) {
    try {
      const productId = DTO.getProductImages(req.query);
      const response = await ImageHandlers.getProductImages(productId);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new ImageControllers();
