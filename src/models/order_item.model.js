const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "orders",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    item_price: {
      type: Number,
      min: 0,
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    collection: "order_items",
    timestamps: true,
  }
);

module.exports = mongoose.model("order_item_model", OrderItemSchema);
