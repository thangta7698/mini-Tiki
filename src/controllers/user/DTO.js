const Joi = require('joi');
const {
  MALE,
  FEMALE,
  BISEXUAL,
  USER,
  SUPER,
  ADMIN,
  GOOGLE,
} = require('../../configs/constants');
const catchValidateError = require('../../helpers/catch_validate_error');
const getPage = require('../../helpers/get_page');
const toSlug = require('../../helpers/to_slug');
const _ = require('lodash');
class DTO {
  createUser(data, role = USER) {
    const { email, password, first_name, last_name, sex, phone, avt_url } =
      data || {};

    const schema = Joi.object({
      role: Joi.number().valid(USER, SUPER, ADMIN),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
      first_name: Joi.string().min(1).required(),
      last_name: Joi.string().min(1).required(),
      sex: Joi.string().valid(MALE, FEMALE, BISEXUAL),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      avt_url: Joi.string().min(1),
    });

    const { error } = schema.validate({
      email,
      password,
      first_name,
      last_name,
      sex,
      phone,
      avt_url,
      role,
    });

    catchValidateError(error);

    return {
      email,
      password,
      first_name,
      last_name,
      sex,
      phone,
      avt_url,
      role,
    };
  }

  loginWithGoogle(data, role = USER) {
    const { email, first_name, last_name, avt_url } = data || {};

    const schema = Joi.object({
      role: Joi.number().valid(USER, SUPER, ADMIN),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      first_name: Joi.string().min(1),
      last_name: Joi.string().min(1),
      // phone: Joi.string(),
      // .length(10)
      // .pattern(/^[0-9]+$/),
      avt_url: Joi.string().min(1),
    });

    const { error } = schema.validate({
      email,
      first_name,
      last_name,
      // phone,
      avt_url,
      role,
      type: GOOGLE,
    });

    catchValidateError(error);

    return {
      email,
      first_name,
      last_name,
      // phone,
      avt_url,
      role,
    };
  }

  updateUser(_id, newData) {
    const { email, password, first_name, last_name, sex, phone, avt_url } =
      newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum(),
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().min(6),
      first_name: Joi.string().min(1),
      last_name: Joi.string().min(1),
      sex: Joi.string().valid(MALE, FEMALE, BISEXUAL),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/),
      avt_url: Joi.string().min(1),
    });

    const { error } = schema.validate({
      _id,
      email,
      password,
      first_name,
      last_name,
      sex,
      phone,
      avt_url,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  changePassword(data) {
    const { new_password, old_password } = data || {};

    const schema = Joi.object({
      new_password: Joi.string().min(6),
      old_password: Joi.string().min(6),
    });

    const { error } = schema.validate({
      new_password,
      old_password,
    });

    catchValidateError(error);

    return {
      old_password,
      new_password,
    };
  }

  queryUsers(params) {
    const { page, role, search } = params || {};
    const schema = Joi.object({
      role: Joi.number().valid(USER, SUPER, ADMIN),
      page: Joi.number().min(1),
      search: Joi.string(),
    });

    const { error } = schema.validate({
      page,
      role: Number(role) || 2,
      search,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);
    const conditions = {
      start,
      limit,
      page,
      search,
    };

    delete params['page'];
    delete params['search'];
    params.role = Number(role) || 2;

    return {
      params,
      conditions,
    };
  }

  getOneUser(data) {
    const { _id } = data;
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  removeUser(data) {
    const { _id } = data;
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }
}

module.exports = new DTO();
