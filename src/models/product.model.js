const mongoose = require("mongoose");
const { INLAND, OVERSEA } = require("../configs/constants");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
      unique: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "brands",
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    thumbnail_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 1000,
    },
    sale_percent: {
      type: Number,
      max: 100,
    },
    stock: {
      type: Number,
      min: 0,
    },
    sold: {
      type: Number,
      min: 0,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    origin: {
      type: String,
      enum: [INLAND, OVERSEA],
      default: INLAND,
    },
    description: {
      type: String,
    },
    short_description: {
      type: String,
      maxlength: 300,
    },
    insurance: {
      type: String,
    },
    in_home: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

module.exports = mongoose.model("product_model", ProductSchema);
