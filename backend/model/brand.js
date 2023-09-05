const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    brandName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
