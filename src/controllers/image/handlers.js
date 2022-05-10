const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const Logger = require("../../helpers/logger");
const deleteCloudinaryImage = require("../../services/cloudinary");
const ProductImageModel = require("../../models/product_image.model");

class ProductImageHandlers {
  async removeProductImage(data) {
    try {
      const removeImgResult = await deleteCloudinaryImage(data.public_id);

      if (!removeImgResult) Logger.error(`Lỗi xóa ảnh. _id: ${data._id}`);

      const result = await ProductImageModel.deleteOne({
        public_id: data.public_id,
      });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove image!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Xóa ảnh thành công!",
          data: null,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async createImage(data) {
    try {
      const result = await ProductImageModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create product image!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Thêm ảnh thành công!",
          data: result.toObject(),
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async getProductImages(productId) {
    try {
      const result = await ProductImageModel.find({ product_id: productId });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create product image!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Lấy ảnh thành công!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new ProductImageHandlers();
