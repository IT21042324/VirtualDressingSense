const normalUser = require("../model/normalUser");
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

const addPersonalDetails = async (req, res) => {
  try {
    
    const userID = req.params.id;
    const{gender, bustheight , chestheight ,  bodyShape ,armLength, hipToAnkleLength, backWidth, neckCircumference} = req.body;

    let measurement = null;

    if(gender === 'male'){
        measurement = {
        chestheight : chestheight,
        bodyShape : bodyShape,
        armLength : armLength,
        thighToAnkleLength : hipToAnkleLength,
        backWidth : backWidth,
        neckCircumference : neckCircumference
      }
    }else{
      measurement = {
        bustheight: bustheight,
        bodyShape : bodyShape,
        armLength : armLength,
        thighToAnkleLength : hipToAnkleLength,
        backWidth : backWidth,
        neckCircumference : neckCircumference
      }
    }

     const user = await normalUserModel.findOneAndUpdate({parent : userID},{gender : gender, measurements : measurement});

    res.status(200).json(user);

  } catch (error) {
    res.send({error : error.message});
  }
}


module.exports = {
  findNormalUserById,
  updateNormalUserById,
  findNormalUser,
  addPersonalDetails
};
