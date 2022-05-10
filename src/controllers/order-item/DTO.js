const Joi = require("joi");
const { INLAND, OVERSEA } = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const _ = require("lodash");

class DTO {
  createOrderItems(data) {
    const { order_items } = data || {};

    const schema = Joi.object({
      order_items: Joi.array()
        .min(1)
        .items(
          Joi.object({
            order_id: Joi.string().alphanum().min(1).required(),
            product: Joi.string().alphanum().min(1).required(),
            item_price: Joi.number().min(1),
            quantity: Joi.number().min(1),
          })
        )
        .required(),
    });

    const { error } = schema.validate({
      order_items,
    });

    catchValidateError(error);

    return { order_items };
  }

  removeOrderItems(data) {
    const { item_ids } = data;
    const schema = Joi.object({
      item_ids: Joi.array()
        .min(1)
        .items(Joi.string().alphanum().min(1).required())
        .required(),
    });

    const { error } = schema.validate({
      item_ids,
    });

    catchValidateError(error);

    return item_ids;
  }

  queryOrderItems(params) {
    const { order_id } = params || {};

    const schema = Joi.object({
      order_id: Joi.string().alphanum().min(1),
    });

    const { error } = schema.validate({
      user_id,
    });

    catchValidateError(error);

    return {
      order_id,
    };
  }
}

module.exports = new DTO();
