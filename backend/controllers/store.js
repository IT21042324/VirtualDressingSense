const storeModel = require("../model/store");
const itemModel = require("../model/item");
const brandModel = require("../model/brand");

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
  const {
    itemName,
    brandName,
    measurementsType,
    mainType,
    subType,
    measurements,
    image,
    gender,
    category,
    type,
    size,
    price,
    color,
  } = req.body;

  try {
    const brand = await brandModel.findOne({ brandName: brandName });

    var item;
    brand ? (item = await itemAlreadyExists(brand._id, type)) : (item = false);

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
      let newBrand;

      !brand
        ? (newBrand = await brandModel.create({
            brandName,
          }))
        : (newBrand = await brandModel.find({ brandName }));

      if (newBrand) {
        const newItem = await itemModel.create({
          itemName,
          store: storeId,
          brand: newBrand._id,
          measurementsType,
          mainType,
          measurements,
          subType,
          image,
          gender,
          category,
          type,
          size,
          price,
          color,
        });

        if (newItem) {
          await storeModel.findByIdAndUpdate(storeId, {
            $push: { items: newItem._id },
          });
          res.status(200).json(newItem);
        }
      } else {
        throw new Error("Unable to locate/create Brand");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

async function itemAlreadyExists(brandId, type) {
  try {
    const item = await itemModel.findOne({
      brand: brandId,
      type: type,
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
  let { itemId } = req.body;
  const { ObjectId } = require("mongoose").Types;
  itemId = new ObjectId(itemId);

  try {
    const item = await itemModel.findByIdAndDelete(itemId);

    const store = await storeModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { items: { $eq: itemId } },
      },
      { new: true }
    );

    res.status(200).json(store);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllStoresForOwner = async (req, res) => {
  try {
    const stores = await storeModel.find({
      owner: req.params.id,
    });
    res.status(200).json(stores);
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(500).json(err);
  }
};

const getAllItemsOfTheStoreUsingStoreId = async (req, res) => {
  try {
    const items = await storeModel
      .findById(req.params.id)
      .select("-_id items")
      .exec();
    res.status(200).json(items);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

module.exports = {
  createStore,
  addItemToStore,
  getStoreById,
  getAllStores,
  deleteStoreById,
  deleteItemFromStoreUsingStoreId,
  getAllStoresForOwner,
  getAllItemsOfTheStoreUsingStoreId,
};
