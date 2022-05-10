const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");

class DTO {
  verify(data) {
    const { access_token } = data || {};

    const schema = Joi.object({
      access_token: Joi.string().min(1),
    });

    const { error } = schema.validate({
      access_token,
    });

    catchValidateError(error);

    return {
      access_token,
    };
  }

  login(data) {
    const { email, password } = data || {};

    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({
      email,
      password,
    });

    catchValidateError(error);

    return {
      email,
      password,
    };
  }
}

module.exports = new DTO();
