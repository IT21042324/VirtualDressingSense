const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    storeName: { type: String, required: true },
    address: { type: String, required: true },
    items: {
      type: Array,
      default: [], //store the entire item here
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
