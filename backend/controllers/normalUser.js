const normalUserModel = require("../model/normalUser");

const findNormalUser = async (req, res) => {
  try {
    const normalUser = await normalUserModel.find();
    res.status(200).json(normalUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message, err);
  }
};

const findNormalUserById = async function (req, res) {
  try {
    const normalUser = await normalUserModel.findById(req.params.id);
    res.status(200).json(normalUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message, err);
  }
};

const updateNormalUserById = async function (req, res) {
  try {
    const updatedNormalUser = await normalUserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedNormalUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message, err);
  }
};

module.exports = {
  findNormalUserById,
  updateNormalUserById,
  findNormalUser,
};
