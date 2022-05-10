const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");

class DTO {
  createComment(data) {
    const { product_id, user_id, content } = data || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
      user_id: Joi.string().alphanum().min(1).required(),
      content: Joi.string().required().min(1),
    });

    const { error } = schema.validate({
      product_id,
      user_id,
      content,
    });

    catchValidateError(error);

    return { product_id, user_id, content };
  }

  queryComments(params) {
    const { product_id, page } = params || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      product_id,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);

    return {
      product_id,
      start,
      limit,
    };
  }
}

module.exports = new DTO();
