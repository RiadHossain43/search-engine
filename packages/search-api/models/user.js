const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerification: {
      status: {
        type: String,
        enum: ["Verified", "Pending"],
        default: "Pending",
      },
      on: {
        type: Date,
        default: null,
      },
    },
    rawPwd: {
      type: String,
    },
    resetToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", Schema);
