const mongoose = require('mongoose');
const { SUCCESS, OK, ERROR, DONE } = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const HttpException = require('../../helpers/http_exception');
const OrderModel = require('../../models/order.model');
const CategoryModel = require('../../models/category.model');
const ProductModel = require('../../models/product.model');
const OrderItemModel = require('../../models/order_item.model');
const UserModel = require('../../models/user.model');
const BrandModel = require('../../models/brand.model');
class StatisticHandlers {
  async getStatistic() {
    try {
      const brandStatistic = await BrandModel.aggregate([
        {
          $lookup: {
            from: ProductModel.collection.name,
            localField: '_id',
            foreignField: 'brand',
            as: 'product',
          },
        },
        {
          $limit: 10,
        },

        {
          $unwind: '$product',
        },
        {
          $group: {
            _id: '$name',
            totalSold: { $sum: '$product.sold' },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
      ]);

      const totalUsersInMonth = await UserModel.find({
        createdAt: {
          $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      });

      const totalOrdersInMonth = await OrderModel.find({
        order_status: DONE,
        createdAt: {
          $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
        },
      });

      let totalAmountInMonth;
      if (totalOrdersInMonth) {
        const ids = totalOrdersInMonth.map((item) => item._id);
        const orderItems = await OrderItemModel.find({
          order_id: { $in: ids },
        });

        totalAmountInMonth = orderItems?.length
          ? orderItems.reduce((prev, cur) => {
              return prev + cur.item_price * cur.quantity;
            }, 0)
          : 0;
      }

      const topSold = await ProductModel.find({ sold: { $gt: 0 } })
        .sort({ sold: -1 })
        .skip(0)
        .limit(16);

      const topRate = await ProductModel.find({ rate: { $gt: 0 } })
        .sort({ rate: -1 })
        .skip(0)
        .limit(16);

      const results = {
        totalOrdersInMonth: totalOrdersInMonth.length || 0,
        totalAmountInMonth,
        topSold,
        totalUsersInMonth: totalUsersInMonth.length,
        brandStatistic,
        topRate,
      };

      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get statistic!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get statistic successfully!',
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new StatisticHandlers();
