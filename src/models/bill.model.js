const mongoose = require("mongoose");
const { Schema } = mongoose;

const BillSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    exporter: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    order_detail: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "orders",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

module.exports = mongoose.model("bill_model", BillSchema);
