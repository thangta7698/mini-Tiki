const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const CommentHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class CommentControllers {
  async createComment(req, res, next) {
    try {
      const data = DTO.createComment(req.body);
      const response = await CommentHandlers.createComment(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async queryComments(req, res, next) {
    try {
      const params = DTO.queryComments(req.params);
      const response = await CommentHandlers.queryComments(params);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new CommentControllers();
