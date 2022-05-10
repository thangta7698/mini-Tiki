const Joi = require("joi");
const { INLAND, OVERSEA } = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const toSlug = require("../../helpers/to_slug");

class DTO {
  createBrand(data) {
    const { name, image_url, image_id } = data || {};

    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      image_url: Joi.string().min(1),
      image_id: Joi.string().min(1),
    });

    const { error } = schema.validate({
      name,
      image_id,
      image_url,
    });

    catchValidateError(error);

    const slug = toSlug(data.name);

    return { ...data, slug };
  }

  updateBrand(_id, newData) {
    const { name, status, image_url, image_id } = newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
      name: Joi.string().min(1),
      image_url: Joi.string().min(1),
      image_id: Joi.string().min(1),
      status: Joi.boolean(),
    });

    const { error } = schema.validate({
      _id,
      name,
      status,
      image_url,
      image_id,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeBrand(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  queryBrands(params) {
    const { page, search } = params || {};

    const schema = Joi.object({
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);

    delete params["search"];
    delete params["page"];

    return {
      conditions: {
        start,
        limit,
        search,
        page,
      },
      params,
    };
  }
}

module.exports = new DTO();
