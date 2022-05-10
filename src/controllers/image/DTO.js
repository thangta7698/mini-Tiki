const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");

class DTO {
  removeImage(data) {
    const { public_id } = data;

    const schema = Joi.object({
      public_id: Joi.string().min(1).required(),
    });

    const { error } = schema.validate({
      public_id,
    });

    catchValidateError(error);

    return {
      public_id,
    };
  }

  createImage(data) {
    const { public_id, product_id, description, url } = data;
    const schema = Joi.object({
      public_id: Joi.string().min(1).required(),
      url: Joi.string().min(1).required(),
      product_id: Joi.string().alphanum().min(1).required(),
      description: Joi.string(),
    });

    const { error } = schema.validate({
      public_id,
      product_id,
      description,
      url,
    });

    catchValidateError(error);

    return {
      public_id,
      product_id,
      description,
      url,
    };
  }

  getProductImages(data) {
    const { product_id } = data;
    const schema = Joi.object({
      product_id: Joi.string().alphanum().min(1).required(),
    });

    const { error } = schema.validate({
      product_id,
    });

    catchValidateError(error);

    return product_id;
  }
}

module.exports = new DTO();
