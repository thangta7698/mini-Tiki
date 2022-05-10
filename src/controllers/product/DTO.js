const Joi = require("joi");
const { INLAND, OVERSEA } = require("../../configs/constants");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");
const toSlug = require("../../helpers/to_slug");
const _ = require("lodash");
const mongoose = require("mongoose");
class DTO {
  createProduct(data) {
    const {
      _id,
      name,
      categories,
      brand,
      origin,
      price,
      sale_percent,
      stock,
      in_home,
      thumbnail_url,
      thumbnail_id,
    } = data || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().min(1).required(),
      name: Joi.string().min(1),
      categories: Joi.array().min(1).items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1).required(),
      price: Joi.number().min(0),
      sale_percent: Joi.number().min(0).max(100),
      origin: Joi.string().valid(INLAND, OVERSEA),
      stock: Joi.number().min(0),
      in_home: Joi.boolean(),
      thumbnail_url: Joi.string().required(),
      thumbnail_id: Joi.string().required(),
    });

    const { error } = schema.validate({
      _id,
      name,
      categories,
      brand,
      price,
      origin,
      sale_percent,
      stock,
      in_home,
      thumbnail_url,
      thumbnail_id,
    });

    catchValidateError(error);

    const slug = toSlug(data.name);

    return { ...data, slug };
  }

  updateProduct(_id, newData) {
    const {
      name,
      categories,
      brand,
      origin,
      price,
      rate,
      sale_percent,
      stock,
      in_home,
      status,
      thumbnail_url,
      thumbnail_id,
    } = newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
      name: Joi.string().min(1),
      origin: Joi.string().valid(INLAND, OVERSEA),
      categories: Joi.array().min(1).items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1),
      price: Joi.number().min(0),
      rate: Joi.number().min(0).max(5),
      sale_percent: Joi.number().min(0).max(100),
      stock: Joi.number().min(0),
      status: Joi.boolean(),
      in_home: Joi.boolean(),
      thumbnail_url: Joi.string(),
      thumbnail_id: Joi.string(),
    });

    const { error } = schema.validate({
      _id,
      name,
      categories,
      brand,
      price,
      sale_percent,
      stock,
      in_home,
      origin,
      rate,
      status,
      thumbnail_url,
      thumbnail_id,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeProduct(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  queryProducts(params) {
    const {
      page,
      search,
      categories,
      brand,
      rate,
      min_price,
      max_price,
      origin,
      sort,
      sort_value,
    } = params || {};

    const categoryArr = _.compact((categories || "").split(","));
    const schema = Joi.object({
      categories: Joi.array().items(Joi.string().alphanum().min(1)),
      brand: Joi.string().alphanum().min(1),
      min_price: Joi.number().min(0),
      max_price: Joi.number().min(0),
      origin: Joi.string().valid(INLAND, OVERSEA),
      rate: Joi.number().min(0).max(5),
      page: Joi.number().min(1),
      sort: Joi.string().min(1),
      sort_value: Joi.string().valid('1', '-1'),
    });

    const { error } = schema.validate({
      categories: categoryArr,
      brand,
      min_price,
      max_price,
      origin,
      rate,
      page,
      sort,
      sort_value,
    });

    catchValidateError(error);
    
    const { start, limit } = getPage(page || 0);
    const conditions = {
      min_price: min_price || 0,
      max_price: max_price || 1000000000000000,
      start,
      limit,
      search,
      sort,
      sort_value,
      page,
    };

    if (categoryArr.length > 0)
      params.categories = {
        $all: categoryArr.map((item) => new mongoose.Types.ObjectId(item)),
      };

    if (params.brand) params.brand = new mongoose.Types.ObjectId(params.brand);

    delete params["page"];
    delete params["min_price"];
    delete params["max_price"];
    delete params["search"];

    return {
      params,
      conditions,
    };
  }

  removeImage(public_id) {
    const schema = Joi.object({
      public_id: Joi.string().min(1).required(),
    });

    const { error } = schema.validate({
      public_id,
    });

    catchValidateError(error);

    return public_id;
  }
}

module.exports = new DTO();
