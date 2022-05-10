const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const ConfigModel = require("../../models/config.model");

class ConfigHandlers {
  async updateConfig(newData) {
    try {
      const option = {
        new: true,
        runValidations: true,
        upsert: true,
      };

      const result = await ConfigModel.findOneAndUpdate(
        {
          website_id: "kltn_ntt",
        },
        newData,
        option
      );

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Cập nhật thất bại"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Cập nhật thành công!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async queryConfig() {
    try {
      const results = await ConfigModel.find({});

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Lỗi lấy thông tin"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "get the information successfully",
          data: results[0].toObject(),
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new ConfigHandlers();
