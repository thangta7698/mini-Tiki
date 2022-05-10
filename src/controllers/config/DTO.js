const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const _ = require("lodash");
class DTO {
  updateConfig(newData) {
    const {
      banner_url_1,
      banner_url_2,
      banner_url_3,
      page_name,
      sub_banner,
      copyright,
      slogan,
      facebook,
      email,
      youtube,
      address,
      hotline,
    } = newData || {};

    const schema = Joi.object({
      banner_url_1: Joi.object({
        image_id: Joi.string(),
        image_url: Joi.string(),
      }),
      banner_url_2: Joi.object({
        image_id: Joi.string(),
        image_url: Joi.string(),
      }),
      banner_url_3: Joi.object({
        image_id: Joi.string(),
        image_url: Joi.string(),
      }),
      sub_banner: Joi.object({
        image_id: Joi.string(),
        image_url: Joi.string(),
      }),
      page_name: Joi.string(),
      copyright: Joi.string().min(1),
      slogan: Joi.string().min(1),
      hotline: Joi.string().min(1),
      address: Joi.string(),
      youtube: Joi.string(),
      facebook: Joi.string(),
      email: Joi.string(),
    });

    const { error } = schema.validate({
      page_name,
      banner_url_1,
      banner_url_2,
      banner_url_3,
      sub_banner,
      copyright,
      facebook,
      email,
      youtube,
      address,
      hotline,
      slogan,
    });

    catchValidateError(error);

    return newData;
  }
}

module.exports = new DTO();
