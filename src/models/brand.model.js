const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      text: true,
      unique: true,
    },
    descripion: {
      type: String,
    },
    image_url: {
      type: String,
    },
    image_id: {
      type: String,
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
    collection: "brands",
    timestamps: true,
  }
);

module.exports = mongoose.model("brand_model", BrandSchema);
