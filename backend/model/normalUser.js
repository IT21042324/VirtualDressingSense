const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normalUserSchema = new Schema(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: String,
    },
    measurements: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("normalUser", normalUserSchema);
