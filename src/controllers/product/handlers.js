const mongoose = require('mongoose');
const { SUCCESS, OK, ERROR, PAGE_SIZE } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const HttpException = require('../../helpers/http_exception');
const ProductModel = require('../../models/product.model');
const ImageModel = require('../../models/product_image.model');
const RatingModel = require('../../models/rating.model');
const deleteCloudinaryImage = require('../../services/cloudinary');

class ProductHandlers {
  async createProduct(data) {
    try {
      const result = await ProductModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create product!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create product successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateProduct(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await ProductModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update product!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update product successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeProduct(_id) {
    try {
      const detailInfo = await ProductModel.findOne({ _id });
      const imageList = await ImageModel.find({ product_id: _id });
      const promises = [];

      promises.push(ProductModel.deleteOne({ _id }));
      if (detailInfo?.thumbnail_id)
        promises.push(deleteCloudinaryImage(detailInfo.thumbnail_id));
      imageList.forEach((img) => {
        promises.push(deleteCloudinaryImage(img.public_id));
      });
      promises.push(ImageModel.deleteMany({ product_id: _id }));

      const result = await Promise.all(promises);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove product!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove product successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryProducts(params, conditions) {
    try {
      const {
        page,
        limit,
        start,
        min_price,
        max_price,
        search,
        sort,
        sort_value,
      } = conditions;
      const query = {
        ...params,
        price: {
          $gte: Number(min_price) || 0,
          $lte: Number(max_price) || 10000000000000000,
        },
        rate: {
          $gte: params.rate || 0,
        },
      };
      const sortQuery = {};
      if (sort && sort_value) sortQuery[sort] = sort_value;
      if (search?.trim()) query.$text = { $search: search };
      console.log(params)
      const total = await ProductModel.countDocuments(query);
      const results = await ProductModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit);
      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get products!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get products successfully!',
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

  async getOneProduct(slug) {
    try {
      const result = await ProductModel.findOne({
        slug,
      })
        .populate({
          path: 'categories',
          model: 'category_model',
          select: 'name slug image_url',
        })
        .populate({
          path: 'brand',
          model: 'brand_model',
          select: 'name slug image_url',
        });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get product!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get product successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new ProductHandlers();
