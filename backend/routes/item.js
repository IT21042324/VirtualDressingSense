const router = require("express").Router();
const {
  findAllItems,
  findItemById,
  saveItem,
  updateItemById,
  flushItemById,
} = require("../controllers/item");

router.get("/", findAllItems);
router.get("/:id", findItemById);
router.post("/", saveItem);
router.patch("/update/:id", updateItemById);
router.patch("/flush/:id", flushItemById);

module.exports = router;
