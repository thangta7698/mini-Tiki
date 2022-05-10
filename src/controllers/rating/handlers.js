const { SUCCESS, OK, ERROR, PAGE_SIZE } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const RatingModel = require("../../models/rating.model");
const _ = require("lodash");
const ProductModel = require("../../models/product.model");
const OrderModel = require("../../models/order.model");
const OrderItemModel = require("../../models/order_item.model");
const HttpException = require("../../helpers/http_exception");

class RatingHandlers {
  async createRate(newData) {
    try {
      //check is bought
      const userOrderIds = await OrderModel.find({
        user_id: newData.user,
      }).select("_id");

      const userOrderItem = await OrderItemModel.findOne({
        order_id: {
          $in: userOrderIds,
        },
        product: newData.product_id,
      });

      if (!userOrderItem) delete newData.stars;

      const result = await RatingModel.create(newData);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create rate!"),
        };

      const starsList = await this.queryRates({
        product_id: newData.product_id,
      });
      if (starsList.status === SUCCESS) {
        const {
          response: { data },
        } = starsList;

        const hasStarsData = data.filter((item) => item.stars > 0);
        const totalStars = hasStarsData.reduce((prev, cur) => {
          return cur.stars + prev;
        }, 0);
        await ProductModel.updateOne(
          {
            _id: newData.product_id,
          },
          {
            rate:
              totalStars > 0
                ? Number(totalStars / hasStarsData.length).toFixed(1)
                : 0,
          }
        );
      }

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create rate successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryRates(params) {
    try {
      const { product_id } = params;

      const results = await RatingModel.find({
        product_id,
      })
        .populate({
          path: "user",
          model: "user_model",
          select: "_id first_name last_name avt_url createdAt",
        })
        .populate({
          path: "product_id",
          model: "product_model",
          select: "name slug",
        });

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get ratings!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get ratings successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryAllRates(params, conditions) {
    try {
      const { limit, start, page } = conditions;

      params = _.omitBy(params, _.isNil);
      const query = {
        ...params,
      };

      const sortQuery = {};

      const total = await RatingModel.countDocuments(query);
      const results = await RatingModel.find(params)
        .sort(sortQuery)
        .skip(start)
        .limit(limit)
        .populate({
          path: "user",
          model: "user_model",
          select: "_id first_name last_name avt_url createdAt",
        })
        .populate({
          path: "product_id",
          model: "product_model",
          select: "name slug",
        });

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get ratings!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get ratings successfully!",
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

  async getIsBought(data) {
    //check is bought
    const { user_id, product_id } = data;
    const userOrderIds = await OrderModel.find({
      user_id: user_id,
    }).select("_id");

    const userOrderItem = await OrderItemModel.findOne({
      order_id: {
        $in: userOrderIds,
      },
      product: product_id,
    });

    return {
      status: SUCCESS,
      response: {
        status: OK,
        message: "Get is bought successfully!",
        data: userOrderItem,
      },
    };
  }
}

module.exports = new RatingHandlers();
