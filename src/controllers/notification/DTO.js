const Joi = require("joi");
const { INLAND, OVERSEA } = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const _ = require("lodash");

class DTO {
  createNotification(data) {
    const { user_id, content } = data || {};

    const schema = Joi.object({
      content: Joi.string().min(1).required(),
      user_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      user_id,
      content,
    });

    catchValidateError(error);

    return { user_id, content };
  }

  queryUserNotification(params) {
    const { user_id } = params || {};

    const schema = Joi.object({
      user_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      user_id,
    });

    catchValidateError(error);

    return {
      user_id,
    };
  }

  queryAllNotification(params) {
    const { page } = params || {};

    const schema = Joi.object({
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);
    const conditions = {
      start,
      limit,
    };

    delete params["page"];

    return {
      params: {},
      conditions,
    };
  }
}

module.exports = new DTO();
