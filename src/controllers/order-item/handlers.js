const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const OrderItemModel = require("../../models/order_item.model");
const ProductModel = require("../../models/product.model");

class OrderItemHandlers {
  async createOrderItems(data) {
    const { order_items } = data;
    try {
      const result = await OrderItemModel.create(order_items);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not order items!"),
        };

      let updatePromises = [];
      order_items.forEach((item) => {
        updatePromises.push(
          ProductModel.updateOne(
            {
              _id: item.product,
            },
            {
              $inc: {
                sold: item.quantity,
                stock: -item.quantity,
              },
            }
          )
        );
      });

      const responses = await Promise.all(updatePromises);

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create order items successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeOrderItems(_ids) {
    try {
      const result = await OrderItemModel.deleteMany({ _id: { $in: _ids } });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove order items!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove order items successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryOrderItems(params) {
    try {
      const { order_id } = params;
      const results = await OrderItemModel.find({ order_id })
        .populate({
          path: "product",
          model: "product_model",
          select: "name brand slug thumnail_url",
        })
        .populate({
          path: "product.brand",
          model: "brand_model",
        });

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get order items!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get order items successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new OrderItemHandlers();
