const router = require("express").Router();

const {
  getStoreById,
  addItemToStore,
  createStore,
  getAllStores,
  deleteStoreById,
  deleteItemFromStoreUsingStoreId,
  getAllStoresForOwner,
} = require("../controllers/store");

router.get("/:id", getStoreById);
router.patch("/add/item", addItemToStore);
router.post("/", createStore);
router.get("/", getAllStores);
router.delete("/delete/:id", deleteStoreById);
router.patch("/delete/item/:id", deleteItemFromStoreUsingStoreId);
router.get("/owner/:id", getAllStoresForOwner);

module.exports = router;
