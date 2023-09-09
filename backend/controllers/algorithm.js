const router = require("express").Router();
const normalUserModel = require("../model/normalUser");
const itemModel = require("../model/item");

const recommondation = async (req, res) => {
  try {
    const { userID, itemID } = req.body;

    const moreDress = [];

    const user = await normalUserModel.findOne({ parent: userID });

    const selectedItem = await itemModel.findOne({ _id: itemID });

    const itemMeasurement = selectedItem.measurements;

    const measurement = user.measurements;

    let recommondedDress;

    if (user.gender === "male") {
      recommondedDress = await itemModel.find({
        measurements: {
          chestHeight: measurement.chestheight,
          bodyShape: measurement.bodyShape,
          armLength: measurement.armLength,
          backWidth: measurement.backWidth,
          neckCircumference: measurement.neckCircumference,
        },
        gender: user.gender,
      });

      recommondedDress.map((dress) => {
        if (dress._id != itemID) {
          moreDress.push(dress);
        }
      });
    } else if (user.gender === "female") {
      recommondedDress = await itemModel.find({
        measurements: {
          bodyShape: measurement.bodyShape,
          armLength: measurement.armLength,
          backWidth: measurement.backWidth,
          neckCircumference: measurement.neckCircumference,
          bustHeight: measurement.bustheight,
        },
        gender: user.gender,
      });

      recommondedDress.map((dress) => {
        if (dress._id != itemID) {
          moreDress.push(dress);
        }
      });
    }

    let userMeasurement = null;
    let dress = null;

    if (user.gender === "male" && selectedItem.gender === "male") {
      userMeasurement = {
        chestheight: measurement.chestheight,
        bodyShape: measurement.bodyShape,
        armLength: measurement.armLength,
        //hipToAnkleLength : measurement.hipToAnkleLength,
        backWidth: measurement.backWidth,
        neckCircumference: measurement.neckCircumference,
      };

      dress = {
        chestheight: itemMeasurement.chestHeight,
        bodyShape: itemMeasurement.bodyShape,
        armLength: itemMeasurement.armLength,
        // hipToAnkleLength : itemMeasurement.hipToAnkleLength,
        backWidth: itemMeasurement.backWidth,
        neckCircumference: itemMeasurement.neckCircumference,
      };
    } else if (user.gender === "female" && selectedItem.gender === "female") {
      userMeasurement = {
        bustheight: measurement.bustheight,
        bodyShape: measurement.bodyShape,
        armLength: measurement.armLength,
        //hipToAnkleLength : measurement.hipToAnkleLength,
        backWidth: measurement.backWidth,
        neckCircumference: measurement.neckCircumference,
      };

      dress = {
        bustheight: itemMeasurement.bustHeight,
        bodyShape: itemMeasurement.bodyShape,
        armLength: itemMeasurement.armLength,
        // hipToAnkleLength : itemMeasurement.hipToAnkleLength,
        backWidth: itemMeasurement.backWidth,
        neckCircumference: itemMeasurement.neckCircumference,
      };
    } else if (user.gender === "male" && selectedItem.gender === "female") {
      res.status(200).json({
        message: "You,re a Male, This not for you | Try these dresses ",
        Dress: recommondedDress,
      });
      return;
    } else if (user.gender === "female" && selectedItem.gender === "male") {
      res.status(200).json({
        message: "You,re a Female, This not for you | Try these dresses ",
        Dress: recommondedDress,
      });
      return;
    } else {
      res.status(404).json({ message: "No Dress Found !!!" });
      return;
    }

    var result = sameDataObj(userMeasurement, dress);

    if (result == true) {
      if (recommondedDress.length > 1) {
        res.status(200).json({
          message: "Perfect Choice :), May you like these also ",
          Dress: moreDress,
        });
      } else {
        res.status(200).json({ message: "Perfect Choice :)" });
      }
    } else {
      if (recommondedDress.length > 1) {
        res.status(200).json({
          message: "Not A Perfect Choice , Check these dresses",
          Dress: recommondedDress,
        });
      } else {
        res.status(200).json({ message: "Not A Perfect Choice " });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

function sameDataObj(o1, o2) {
  let obj1Key = Object.keys(o1);

  if (obj1Key.length === Object.keys(o2).length) {
    return obj1Key.every(
      (key) => o2.hasOwnProperty(key) && o2[key] === o1[key]
    );
  } else {
    return false;
  }
}

module.exports = {
  recommondation,
};
