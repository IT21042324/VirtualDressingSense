const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    store: {
      type: Array,
      default: [], //store storeId in here so that we can use populate function when needed
    },
    itemName: {
      type: String,
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    measurementsType: {
      type: String,
      default: "in",
    },
    mainType: {
      type: "String",
      default: "top",
    },
    measurements: Object,
    image: String,
    gender: String,
    category: String, //like children/Teens/Adults
    subType: {
      type: Array,
      default: [],
    },
    size: String,
    price: String,
    color: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
