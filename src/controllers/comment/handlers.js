const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const CommentModel = require("../../models/comment.model");

class CommentHandlers {
  async createComment(data) {
    try {
      const result = await CommentModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create comment!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create comment successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryComments(params) {
    try {
      const { product_id, start, limit } = params;

      const results = await CommentModel.find({
        product_id,
      })
        .skip(start)
        .limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get comments!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get comments successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new CommentHandlers();
