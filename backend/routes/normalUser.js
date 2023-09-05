const router = require("express").Router();

const {
  updateNormalUserById,
  findNormalUserById,
  findNormalUser,
} = require("../controllers/normalUser");

router.get("/:id", findNormalUserById);
router.get("/", findNormalUser);
router.patch("/update/:id", updateNormalUserById);

module.exports = router;
