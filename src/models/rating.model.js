const mongoose = require("mongoose");
const { Schema } = mongoose;

const RatingSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    stars: {
      type: Number,
      min: 0,
      max: 5,
    },
    content: {
      type: String,
    }
  },
  {
    collection: "ratings",
    timestamps: true,
  }
);

module.exports = mongoose.model("rating_model", RatingSchema);
