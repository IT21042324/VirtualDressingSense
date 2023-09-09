const router = require("express").Router();

const {
  updateNormalUserById,
  findNormalUserById,
  findNormalUser,
  addPersonalDetails
} = require("../controllers/normalUser");

router.get("/:id", findNormalUserById);
router.get("/", findNormalUser);
router.patch("/update/:id", updateNormalUserById);
router.patch("/addPersonalDetails/:id", addPersonalDetails);


module.exports = router;
