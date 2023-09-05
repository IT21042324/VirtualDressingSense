const storeOwnerModel = require("../model/storeOwner");

const findStoreOwnerById = async function (req, res) {
  const { storeOwnerId } = req.params;

  try {
    const storeOwner = await storeOwnerModel.findById(storeOwnerId);
    res.status(200).json(storeOwner);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message, err);
  }
};

const updateStoreOwnerById = async function (req, res) {
  const { storeOwnerId } = req.params;
  const { store } = req.body;

  try {
    const updatedStoreOwner = await storeOwnerModel.findByIdAndUpdate(
      storeOwnerId,
      { store },
      { new: true }
    );

    res.status(200).json(updatedStoreOwner);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message, err);
  }
};

module.exports = {
  findStoreOwnerById,
  updateStoreOwnerById,
};
