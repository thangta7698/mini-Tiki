const {
  SUCCESS,
  OK,
  ERROR,
  PAGE_SIZE,
  PENDING,
  CANCELED,
} = require('../../configs/constants');
const catchHandlerError = require('../../helpers/catch_handler_error');
const HttpException = require('../../helpers/http_exception');
const OrderModel = require('../../models/order.model');
const OrderItemModel = require('../../models/order_item.model');
require('../../models/category.model');
require('../../models/brand.model');
class OrderHandlers {
  async createOrder(data) {
    try {
      const result = await OrderModel.create(data);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not create order!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Create order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateOrder(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(query, data, option);

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not update order!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Update order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async cancelOrder(user_id, query) {
    try {
      const order = await OrderModel.findOne(query);

      if (order.order_status !== PENDING && order.user !== user_id)
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not canceled order!'),
        };

      const option = {
        new: true,
        runValidations: true,
      };

      const result = await OrderModel.findOneAndUpdate(
        { ...query },
        {
          order_status: CANCELED,
        },
        option
      );

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Canceled order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeOrder(_id) {
    try {
      const result = await OrderModel.deleteOne({ _id });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not remove order!'),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Remove order successfully!',
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryOrders(params, conditions) {
    try {
      const { limit, start, page } = conditions;
      const totalOrdersPromise = OrderModel.count(params);
      const resultsPromise = OrderModel.find(params)
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
        .populate({
          path: 'user',
          model: 'user_model',
          select: '_id first_name last_name avt_url address',
        });
      const total = await totalOrdersPromise;
      const results = await resultsPromise;
      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get orders!'),
        };

      const orderDetails = await Promise.all(
        results.map(async (item) => {
          const order_items = await OrderItemModel.find({
            order_id: item._id,
          }).populate({
            path: 'product',
            model: 'product_model',
            populate: {
              path: 'brand',
              model: 'brand_model',
            },
          });

          return {
            ...item.toObject(),
            order_items,
          };
        })
      );


      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get orders successfully!',
          data: orderDetails,
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryUserOrdersList({ user }) {
    try {
      const results = await OrderModel.find({ user });
      if (!results || results === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get orders!'),
        };

      const orderDetails = await Promise.all(
        results.map(async (item) => {
          const order_items = await OrderItemModel.find({
            order_id: item._id,
          }).populate({
            path: 'product',
            model: 'product_model',
            populate: {
              path: 'brand',
              model: 'brand_model',
            },
          });


          return {
            ...item.toObject(),
            order_items,
          };
        })
      );
      console.log(orderDetails)

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get orders successfully!',
          data: orderDetails,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getOneOrder(_id) {
    try {
      const result = await OrderModel.findOne({
        _id,
      });

      if (!result || result === 'null')
        return {
          status: ERROR,
          response: new HttpException(400, 'Can not get order!'),
        };

      const order_items = await OrderItemModel.find({
        order_id: _id,
      }).populate({
        path: 'product',
        model: 'product_model',
        populate: {
          path: 'brand',
          model: 'brand_model',
        },
      });

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: 'Get order successfully!',
          data: { ...result.toObject(), order_items },
        },
      };
    } catch (error) {
      console.log(error);
      return catchHandlerError(error);
    }
  }
}

module.exports = new OrderHandlers();
