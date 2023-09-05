const router = require("express").Router();
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrandById,
  deleteBrandById,
} = require("../controllers/brand");

router.get("/", getAllBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.patch("/update/:id", updateBrandById);
router.delete("/delete/:id", deleteBrandById);

module.exports = router;
