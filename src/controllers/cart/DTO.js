const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const _ = require("lodash");
class DTO {
  addToCart(data) {
    const { user_id, product_id, quantity } = data || {};

    const schema = Joi.object({
      user_id: Joi.string().alphanum().min(1).required(),
      product_id: Joi.string().alphanum().min(1).required(),
      quantity: Joi.number().min(1),
    });

    const { error } = schema.validate({
      user_id,
      product_id,
      quantity,
    });

    catchValidateError(error);

    return { ...data, product: product_id };
  }

  updateCartItem(_id, newData) {
    const { quantity } = newData || {};

    const schema = Joi.object({
      quantity: Joi.number().min(1),
    });

    const { error } = schema.validate({
      quantity,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeCartItems(data) {
    const { _ids } = data;

    const schema = Joi.object({
      _ids: Joi.array().min(1).items(Joi.string().alphanum()).required(),
    });

    const { error } = schema.validate({
      _ids,
    });

    catchValidateError(error);

    return _ids;
  }

  queryCart(params) {
    const { user_id } = params || {};

    const schema = Joi.object({
      user_id: Joi.string().alphanum().min(1),
    });

    const { error } = schema.validate({
      user_id,
    });

    catchValidateError(error);

    return {
      user_id,
    };
  }
}

module.exports = new DTO();
