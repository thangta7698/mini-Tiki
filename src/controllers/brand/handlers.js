const { SUCCESS, OK, ERROR, PAGE_SIZE } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const BrandModel = require('../../models/brand.model');
const deleteCloudinaryImage = require('../../services/cloudinary');

class BrandHandlers {
  async createBrand(data) {
    try {
      const result = await BrandModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create brand!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create brand successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateBrand(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
        //upsert: true
      };

      const result = await BrandModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update brand!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update brand successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeBrand(_id) {
    try {
      const detailInfo = await BrandModel.findOne({ _id });
      const result = await BrandModel.deleteOne({ _id });

      if (detailInfo?.image_id)
        await deleteCloudinaryImage(detailInfo.image_id);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove brand!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove brand successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryBrands(params, conditions) {
    try {
      const { limit, start, search, page } = conditions;
      const query = {
        ...params,
      };
      console.log(conditions);

      const sortQuery = {};
      if (search?.trim()) query.$text = { $search: search };

      const total = await BrandModel.countDocuments(query);
      const results = await BrandModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit);

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get brand!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get brands successfully!',
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new BrandHandlers();
