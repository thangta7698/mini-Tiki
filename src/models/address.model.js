const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    province: {
      name: String,
      code: Number,
    },
    district: {
      name: String,
      code: Number,
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
  {
    collection: 'addresses',
    timestamps: true,
  }
);

module.exports = mongoose.model('address_model', AddressSchema);
