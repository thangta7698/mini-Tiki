const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConfigSchema = new Schema(
  {
    website_id: {
      type: String,
      default: "kltn_ntt",
    },
    page_name: {
      type: String,
      default: "",
      required: true,
    },
    banner_url_1: {
      image_url: String,
      image_id: String,
    },
    banner_url_2: {
      image_url: String,
      image_id: String,
    },
    banner_url_3: {
      image_url: String,
      image_id: String,
    },
    sub_banner: {
      image_url: String,
      image_id: String,
    },
    copyright: {
      type: String,
    },
    facebook: {
      type: String,
    },
    email: {
      type: String,
    },
    youtube: {
      type: String,
    },
    address: {
      type: String,
    },
    hotline: {
      type: String,
    },
    slogan: {
      type: String,
    },
  },
  {
    collection: "configs",
    timestamps: true,
  }
);

module.exports = mongoose.model("config_model", ConfigSchema);
