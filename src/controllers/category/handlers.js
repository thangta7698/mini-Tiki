const { SUCCESS, OK, ERROR, PAGE_SIZE } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const HttpException = require('../../helpers/http_exception');
const CategoryModel = require('../../models/category.model');
const deleteCloudinaryImage = require('../../services/cloudinary');
class BrandHandlers {
  async createCategory(data) {
    try {
      const result = await CategoryModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create category!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create category successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateCategory(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await CategoryModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update category!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update category successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeCategory(_id) {
    try {
      const detailInfo = await CategoryModel.findOne({ _id });
      const result = await CategoryModel.deleteOne({ _id });

      if (detailInfo?.image_id)
        await deleteCloudinaryImage(detailInfo.image_id);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove category!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove category successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryCategories(params, conditions) {
    try {
      const { limit, start, search, page } = conditions;
      const query = {
        ...params,
      };
      if (search?.trim()) query.$text = { $search: search };
      const sortQuery = {};


      const total = await CategoryModel.countDocuments(query);
      const results = await CategoryModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit);

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get categories!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get categories successfully!',
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
