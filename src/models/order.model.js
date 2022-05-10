const mongoose = require("mongoose");
const {
  COD,
  PAYPAL,
  DONE,
  PENDING,
  CONFIRMED,
  CANCELED,
} = require("../configs/constants");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    order_status: {
      type: String,
      enum: [DONE, PENDING, CONFIRMED, CANCELED],
      default: PENDING,
    },
    payment_type: {
      type: String,
      enum: [COD, PAYPAL],
      default: COD,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    address: {
      province: {
        name: String,
        code: String,
      },
      district: {
        name: String,
        code: String,
      },
      ward: {
        name: String,
        code: String,
      },
      street: {
        type: String,
        required: true,
      },
    },
    exporter: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("order_model", OrderSchema);
