const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductImageSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "product_images",
    timestamps: true,
  }
);

module.exports = mongoose.model("product_image_model", ProductImageSchema);
