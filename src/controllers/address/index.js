const DTO = require('./DTO');
const HttpException = require('../../helpers/http_exception');
const catchRoutesError = require('../../helpers/catch_routes_error');
const addressHandlers = require('./handlers');
const { ERROR } = require('../../configs/constants');

class AddressControllers {
  async createAddress(req, res, next) {
    try {
      const data = DTO.createAddress(req.body);
      const response = await addressHandlers.createAddress(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateAddress(req, res, next) {
    try {
      const { _id } = req.params;
      const { newData } = DTO.updateAddress(_id, req.body);
      const response = await addressHandlers.updateAddress(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeAddress(req, res, next) {
    try {
      const { _id } = DTO.removeAddress(req.params);
      const response = await addressHandlers.removeAddress({ _id });

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryAddressByUser(req, res, next) {
    try {
      const { user } = DTO.queryAddressByUser(req.query);
      const response = await addressHandlers.queryAddressByUser({ user });

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new AddressControllers();
