const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    roleID: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    creditedAt: { type: Date, default: Date.now },
  },

  { versionKey: false }
);

module.exports = mongoose.model(`users`, userSchema);
