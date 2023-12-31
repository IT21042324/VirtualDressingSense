const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeOwnerSchema = new Schema({
  parent: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  store: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("StoreOwner", storeOwnerSchema);
