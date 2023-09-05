const router = require("express").Router();

const {
  findStoreOwnerById,
  updateStoreOwnerById,
} = require("../controllers/storeOwner");

router.get("/:storeOwnerId", findStoreOwnerById);
router.patch("/update/:storeOwnerId", updateStoreOwnerById);

module.exports = router;
