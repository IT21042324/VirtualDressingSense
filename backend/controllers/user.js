const userModel = require("../model/user");
const storeOwnerModel = require("../model/storeOwner");
const normalUserModel = require("../model/normalUser");
const jwt = require("jsonwebtoken");

//To generate a token
const createToken = (id) => {
  //1st argument->object for payload
  //2nd argument-> secret string only know for our server (.env file)
  //3rd argument-> optional. just to say it expires in 3 days
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};
const userLogin = async (req, res) => {
  try {
    const { userName, password, userType } = req.body;

    // Authenticate user using userModel's login method
    const user = await userModel.login(userName, password, userType);

    // Create JWT for authenticated user
    const token = createToken(user._id);

    // Send JWT and user data in response
    res.json({ ...user.toObject(), token });
  } catch (err) {
    console.log(err.message);
    res.json({ err: err.message });
  }
};

const userSignUp = async function (req, res) {
  // Get user details from request body
  const { userName, password, userType } = req.body;

  try {
    // Create new user using userModel's signup method
    const user = await userModel.signup(userName, password, userType);

    userType === "normalUser"
      ? await createNormalUser(user._id)
      : await createStoreOwner(user._id);

    // Create JWT for new user
    const token = createToken(user._id);

    // Send JWT and user data in response
    res.status(200).json({ ...user.toObject(), token });
  } catch (err) {
    console.log(err.message);
    res.json({ err: err.message });
  }
};

const createStoreOwner = async (userId) => {
  try {
    await storeOwnerModel.create({ parent: userId });
  } catch (err) {
    console.log(err.message);
    res.json({ err: err.message });
  }
};

const createNormalUser = async (userId) => {
  try {
    await normalUserModel.create({ parent: userId });
  } catch (err) {
    console.log(err.message);
    res.json({ err: err.message });
  }
};

const getAllUsers = async function (req, res) {
  try {
    const users = await userModel.find();

    console.log(users);
    res.json(users);
  } catch (err) {
    res.send(err.message);
  }
};

const updateUserName = async function (req, res) {
  const { userId } = req.params;
  const { userName } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { userName },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const data = await userModel.findByIdAndDelete(req.params.id);

    data.userType.toLowerCase() === "normalUser"
      ? deleteNormalUserById(req.params.id)
      : deleteStoreOwnerById(req.params.id);

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
};

const deleteNormalUserById = async (parentUserId) => {
  try {
    await normalUserModel.findOneAndDelete({ parent: parentUserId });
  } catch (err) {
    console.log(err.message, err);
    res.send(err.message);
  }
};

const deleteStoreOwnerById = async (parentUserId) => {
  try {
    await storeOwnerModel.findOneAndDelete({ parent: parentUserId });
  } catch (err) {
    console.log(err.message, err);
    res.send(err.message);
  }
};

const getUserById = async function (req, res) {
  const { id } = req.params;

  try {
    const user = await userModel.find({ _id: id });

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = {
  userSignUp,
  userLogin,
  getAllUsers,
  updateUserName,
  deleteUserById,
  getUserById,
};
