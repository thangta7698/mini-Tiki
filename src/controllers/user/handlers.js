const { SUCCESS, OK, ERROR, PAGE_SIZE } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const generateToken = require('../../helpers/generate_token');
const HttpException = require('../../helpers/http_exception');
const AddressModel = require('../../models/address.model');
const UserModel = require('../../models/user.model');
require('../../models/category.model');
require('../../models/brand.model');
class UserHandlers {
  async createUser(data) {
    try {
      const result = await UserModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create user!'),
        };

      delete result['password'];
      delete result['role'];

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async loginWithGoogle(data) {
    const { email } = data;

    try {
      const result = await UserModel.findOne({
        email,
      });

      if (!result || result === 'null') {
        const newUser = await UserModel.create(data);

        if (!newUser || newUser === 'null')
          return {
            status: ERROR,
            response: new HttpException(400, 'Can not create user!'),
          };

        const { _id, role, email, first_name, last_name, avt_url } = newUser;
        const token = generateToken({ _id, role });

        return {
          status: SUCCESS,
          response: {
            status: OK,
            message: 'Create user successfully!',
            data: {
              _id,
              role,
              email,
              first_name,
              last_name,
              avt_url,
              token,
            },
          },
        };
      }

      const { _id, role } = result;
      const token = generateToken({ _id, role });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Login successfully!',
          data: { ...result, token },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateUser(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await UserModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update user!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async changePassword(userId, data) {
    try {
      const { old_password, new_password } = data;
      const userInfo = await UserModel.findOne({ _id: userId });

      if (old_password === new_password)
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not use old password!'),
        };

      if (old_password !== userInfo.password)
        return {
          status: ERROR,
          response: new HttpException(400, 'Password does not match!'),
        };

      const option = {
        new: true,
        runValidations: true,
      };
      const newUserInfo = await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: new_password },
        option
      );
      const newToken = generateToken({
        _id: newUserInfo._id,
        role: newUserInfo.role,
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update password user successfully!',
          data: {
            token: newToken,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUsers(params, conditions) {
    try {
      const { limit, start, page, search } = conditions;
      const query = { ...params };
      const sortQuery = {};

      if (search?.trim()) query.$text = { $search: search };

      const total = await UserModel.countDocuments(query);
      const results = await UserModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit)
        .select('-password');

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get users!'),
        };

      const responseWithAddresses = await Promise.all(
        results.map((item) => {
          return new Promise(async (resolve, reject) => {
            try {
              const addresses = await AddressModel.find({ user: item._id });
              const newItem = {
                ...item.toObject(),
                addresses,
              };
              resolve(newItem);
            } catch (error) {
              resolve(item);
            }
          });
        })
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get users successfully!',
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
          data: responseWithAddresses,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneUser(_id) {
    try {
      const result = await UserModel.findOne({
        _id,
      }).select('-password');

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get user!'),
        };

      const address = await AddressModel.find({ user: _id });
      if (address?.length > 0) result.address = address;

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeUser(_id) {
    try {
      const result = await UserModel.deleteOne({ _id });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get user!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'remove user successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new UserHandlers();
