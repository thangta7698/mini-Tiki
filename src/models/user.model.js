const mongoose = require('mongoose');
const {
  MALE,
  FEMALE,
  BISEXUAL,
  USER,
  ADMIN,
  SUPER,
  DEFAULT,
} = require('../configs/constants');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    role: {
      type: Number,
      enum: [USER, ADMIN, SUPER],
      default: USER,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: DEFAULT,
    },
    first_name: {
      type: String,
      // required: true,
      text: true,
    },
    last_name: {
      type: String,
      // required: true,
      text: true,
    },
    sex: {
      type: String,
      enum: [MALE, FEMALE, BISEXUAL],
    },
    phone: {
      type: String,
    },
    avt_url: {
      type: String,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

module.exports = mongoose.model('user_model', UserSchema);
