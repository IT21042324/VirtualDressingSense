const storeModel = require("../controllers/store");
const itemModel = require("../model/item");

const createStore = async (req, res) => {
  try {
    const store = await storeModel.create(req.body);
    res.status(200).json(store);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await storeModel.findById(req.params.id);
    res.status(200).json(store);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await storeModel.find();
    res.status(200).json(stores);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

const addItemToStore = async (req, res) => {
  //here req.body only contains the item model properties only.
  const { storeId } = req.params;

  try {
    const item = await itemAlreadyExists(req.body);

    if (item) {
      await itemModel.findByIdAndUpdate(item._id, {
        $pull: { store: storeId }, //to remove the storeId
        $push: { store: storeId }, //to again reenter the storeId
      });
      await storeModel.findByIdAndUpdate(storeId, {
        $pull: { items: item._id },
        $push: { items: item._id },
      });
    } else {
      const item = await itemModel.create(req.body);
      await storeModel.findByIdAndUpdate(storeId, {
        $push: { items: item._id },
      });
    }
    res.status(200).json(item);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

async function itemAlreadyExists(item) {
  try {
    const item = await itemModel.findOne({
      brand: item.brand,
      type: item.type,
    });

    if (item) {
      return item;
    } else {
      return false;
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const deleteStoreById = async function deleteStoreById(req, res) {
  try {
    const store = await storeModel.findByIdAndDelete(req.params.id);
    res.status(200).json(store);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

const deleteItemFromStoreUsingStoreId = async (req, res) => {
  const { itemId } = req.body;

  try {
    const store = await storeModel.findByIdAndUpdate(req.params.id, {
      $pull: { items: itemId },
    });
    res.status(200).json(store);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

module.exports = {
  createStore,
  addItemToStore,
  getStoreById,
  getAllStores,
  deleteStoreById,
  deleteItemFromStoreUsingStoreId,
};
