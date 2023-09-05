const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    store: {
      type: Array,
      default: [], //store itemId in here so that we can use populate function when needed
    },
    image: String,
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    type: {
      type: String,
    },
    sizes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
