const itemModel = require("../model/item");
const storeModel = require("../model/store");

const saveItem = async (req, res) => {
  try {
    const item = new itemModel(req.body);
    await item.save();
    res.status(200).json({ message: "Item saved successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemModel.findById(id);
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findAllItems = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateItemById = async (req, res) => {
  try {
    const updateItem = await itemModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const flushItemById = async (req, res) => {
  try {
    const isItemFlushedFromAllStores = await flushItemFromAllStores(
      req.params.id
    );

    if (isItemFlushedFromAllStores) {
      await itemModel.deleteMany({ _id: req.params.id });
    } else {
      throw new Error("Deletion Status not completed");
    }

    res.status(200).json({ message: "Items deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

async function flushItemFromAllStores(itemId) {
  try {
    const updatedStoreList = await storeModel.updateMany(
      { _id: itemId },
      { $pull: { items: itemId } },
      { new: true }
    );

    if (updatedStoreList) return true;
    else return false;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

module.exports = {
  saveItem,
  findItemById,
  findAllItems,
  updateItemById,
  flushItemById,
};
