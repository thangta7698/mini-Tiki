const DTO = require('./DTO');
const HttpException = require('../../helpers/http_exception');
const catchRoutesError = require('../../helpers/catch_routes_error');
const UserHandlers = require('./handlers');
const { OK, ERROR, ADMIN } = require('../../configs/constants');

class UserControllers {
  async createUser(req, res, next) {
    try {
      const data = DTO.createUser(req.body);
      const response = await UserHandlers.createUser(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async loginWithGoogle(req, res, next) {
    try {
      const data = DTO.loginWithGoogle(req.body);
      const response = await UserHandlers.loginWithGoogle(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async createAdmin(req, res, next) {
    try {
      const data = DTO.createUser(req.body, ADMIN);
      const response = await UserHandlers.createUser(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateUser(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateUser(_id, req.body);

      if (!_id === req.user?._id)
        return next(new HttpException(401, 'Access denied!'));

      const response = await UserHandlers.updateUser(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async changePassword(req, res, next) {
    try {
      const data = DTO.changePassword(req.body);
      const userId = req.user?._id;
      const response = await UserHandlers.changePassword(userId, data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryUsers(req, res, next) {
    try {
      const { params, conditions } = DTO.queryUsers(req.query);
      const response = await UserHandlers.queryUsers(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async getOneUser(req, res, next) {
    try {
      const _id = DTO.getOneUser(req.params);
      const response = await UserHandlers.getOneUser(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeUser(req, res, next) {
    try {
      const _id = DTO.getOneUser(req.params);
      const response = await UserHandlers.removeUser(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new UserControllers();
