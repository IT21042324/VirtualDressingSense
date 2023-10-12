const router = require("express").Router();

const {
  userLogin,
  userSignUp,
  updateUserName,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateMeasurements,
} = require("../controllers/user");

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.get("/", getAllUsers);
router.patch("/update/:userId", updateUserName);
router.get("/:id", getUserById);
router.delete("/deleteUser/:id", deleteUserById);
router.patch("/updateMeasurements/:id", updateMeasurements);

module.exports = router;
