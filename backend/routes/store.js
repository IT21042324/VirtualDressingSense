const router = require("express").Router();

const {
  getStoreById,
  addItemToStore,
  createStore,
  getAllStores,
  deleteStoreById,
  deleteItemFromStoreUsingStoreId,
} = require("../controllers/store");

router.get("/:id", getStoreById);
router.patch("/add/item", addItemToStore);
router.post("/", createStore);
router.patch("/", getAllStores);
router.delete("/delete/:id", deleteStoreById);
router.patch("/delete/item/:id", deleteItemFromStoreUsingStoreId);

module.exports = router;
