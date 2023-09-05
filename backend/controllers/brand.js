const brandModel = require("../model/brand");

const getAllBrands = async function (req, res) {
  try {
    const brands = await brandModel.find();
    return res.status(200).json(brands);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getBrandById = async function (req, res) {
  try {
    const brand = await brandModel.findById(req.params.id);
    return res.status(200).json(brand);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const createBrand = async function (req, res) {
  try {
    const brand = await brandModel.create(req.body);
    return res.status(201).json(brand);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateBrandById = async function (req, res) {
  const { brandName } = req.body;
  try {
    const brand = await brandModel.findByIdAndUpdate(
      req.params.id,
      { brandName },
      { new: true }
    );
    return res.status(200).json(brand);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteBrandById = async function (req, res) {
  try {
    const brand = await brandModel.findByIdAndDelete(req.params.id);
    return res.status(200).json(brand);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrandById,
  deleteBrandById,
};
