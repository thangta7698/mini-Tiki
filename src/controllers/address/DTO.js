const Joi = require('joi');
const catchValidateError = require('../../helpers/catch_validate_error');

class DTO {
  createAddress(data) {
    const { user, province, district, ward, street } = data || {};
    const schema = Joi.object({
      user: Joi.string().alphanum().min(1).required(),
      province: Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
      }).required(),
      district: Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
      }).required(),
      ward: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
      }).required(),
      street: Joi.string().required(),
    });
    const { error } = schema.validate({
      user,
      province,
      district,
      ward,
      street,
    });

    catchValidateError(error);

    return { user, province, district, ward, street };
  }

  updateAddress(_id, data) {
    const { province, district, ward, street } = data || {};
    const schema = Joi.object({
      province: Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
      }),
      district: Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
      }),
      ward: Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
      }),
      street: Joi.string(),
      _id: Joi.string().required(),
    });
    const { error } = schema.validate({
      province,
      district,
      ward,
      street,
      _id,
    });

    catchValidateError(error);

    return { newData: { province, district, ward, street }, _id };
  }

  queryAddressByUser(params) {
    const { user } = params || {};
    const schema = Joi.object({
      user: Joi.string().alphanum().min(1).required(),
    });
    const { error } = schema.validate({
      user,
    });

    catchValidateError(error);

    return {
      user,
    };
  }

  removeAddress(params) {
    const { _id } = params || {};
    const schema = Joi.object({
      _id: Joi.string().alphanum().min(1).required(),
    });
    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return {
      _id,
    };
  }
}

module.exports = new DTO();
