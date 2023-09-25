const storeModel = require("../model/store");
const itemModel = require("../model/item");
const brandModel = require("../model/brand");

const generateReportForStoreItem = async (req, res) => {
  const storeId = req.params.id;

  try {
    const data = await storeModel.findById(storeId);

    //Data To Pass in json response
    //const numberOfStores = Object.keys(data).length;

    res.status(200).json({ numberOfStores });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const generateReportForStoreWithUserId = async (req, res) => {
  const ownerId = req.params.id;
  try {
    const data = storeModel.find({
      owner: ownerId,
    });

    const numberOfStores = data.size;

    //to get the stores and their Locations
    const storeAndAddress = [];

    data.map((stor) => {
      storeAndAddress.push({
        _id: stor._id,
        storeName: stor.storeName,
        registeredAddress: stor.address,
      });
    });

    res.status(200).json({ numberOfStores, storeAndAddress });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFeaturedBrands = async (items) => {
  try {
    const items = [];

    const data = await itemModel.find();
    return data;
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { generateReportForStoreItem };
