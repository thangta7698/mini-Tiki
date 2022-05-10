const { SUCCESS, OK, ERROR } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const _ = require('lodash');
const HttpException = require('../../helpers/http_exception');
const AddressModel = require('../../models/address.model');

class AddressHandlers {
  async createAddress(newData) {
    try {
      const result = await AddressModel.create(newData);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create rate!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create address successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateAddress(_id, newData) {
    try {
      const result = await AddressModel.updateOne({ _id }, newData, {
        upsert: true,
        new: true,
      });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update address!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update address successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryAddressByUser(params) {
    try {
      const { user } = params;
      const results = await AddressModel.find({
        user,
      });

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get address!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get address successfully!',
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeAddress(params) {
    try {
      const { _id } = params;
      const result = await AddressModel.deleteOne({ _id });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove address!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove address successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new AddressHandlers();
