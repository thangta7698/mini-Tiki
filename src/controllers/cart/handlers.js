const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const CartItemModel = require("../../models/cart_item.model");
const ProductModel = require("../../models/product.model");

class ProductHandlers {
  async addToCart(data) {
    try {
      const productInfo = await ProductModel.findOne({ _id: data.product });

      if (productInfo?.stock < data.quantity)
        return {
          status: ERROR,
          response: new HttpException(400, "Over stock!"),
        };

      const oldItem = await CartItemModel.findOne({
        product: data.product,
      });

      if (oldItem?.product) return this.updateCartItem(oldItem._id, data);

      const result = await CartItemModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not add to cart!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Add to cart successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateCartItem(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await CartItemModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update cart item!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update cart item successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeCartItems(_ids) {
    try {
      const result = await CartItemModel.deleteMany({
        _id: {
          $in: _ids
        },
      });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove cart item!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove cart item successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryCart(params) {
    try {
      const results = await CartItemModel.find(params).populate({
        path: "product",
        model: "product_model",
      });

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get cart!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get cart successfully!",
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new ProductHandlers();
