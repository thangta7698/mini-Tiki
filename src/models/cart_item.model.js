const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    quantity: {
      type: Number,
      min: 1,
    },
  },
  {
    collection: "cart_items",
    timestamps: true,
  }
);

module.exports = mongoose.model("cart_item_model", CartItemSchema);
