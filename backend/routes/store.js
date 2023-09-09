const router = require("express").Router();

const {
  getStoreById,
  addItemToStore,
  createStore,
  getAllStores,
  deleteStoreById,
  deleteItemFromStoreUsingStoreId,
  getAllStoresForOwner,
  getAllItemsOfTheStoreUsingStoreId,
} = require("../controllers/store");

router.get("/:id", getStoreById);
router.patch("/add/item/:storeId", addItemToStore);
router.post("/", createStore);
router.get("/", getAllStores);
router.delete("/delete/:id", deleteStoreById);
router.patch("/delete/item/:id", deleteItemFromStoreUsingStoreId);
router.get("/owner/:id", getAllStoresForOwner);
router.get("/items/:id", getAllItemsOfTheStoreUsingStoreId);

module.exports = router;
