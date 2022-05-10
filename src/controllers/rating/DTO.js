const Joi = require('joi');
const catchValidateError = require('../../helpers/catch_validate_error');
const getPage = require('../../helpers/get_page');

class DTO {
  createRate(data) {
    const { product_id, user, stars, content } = data || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
      user: Joi.string().alphanum().min(1).required(),
      stars: Joi.number().required().min(1).max(5),
      content: Joi.string().min(3),
    });

    const { error } = schema.validate({
      product_id,
      user,
      stars,
      content,
    });

    catchValidateError(error);

    return { product_id, user, stars, content };
  }

  queryRates(params) {
    const { product_id } = params || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      product_id,
    });

    catchValidateError(error);

    return {
      product_id,
    };
  }

  queryAllRates(params) {
    const { product_id, page } = params || {};

    const schema = Joi.object({
      page: Joi.number().min(1),
      product_id: Joi.string().alphanum().min(1),
    });

    const { error } = schema.validate({
      page,
      product_id,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);

    delete params['product_id'];
    delete params['page'];

    return {
      conditions: {
        start,
        limit,
        page: page || 1,
      },
      params,
    };
  }

  getIsBought(params) {
    const { product_id, user_id } = params || {};

    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
      user_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      product_id,
      user_id,
    });

    catchValidateError(error);

    return {
      product_id,
      user_id,
    };
  }
}

module.exports = new DTO();
