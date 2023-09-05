const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//Creating User schema functions
userSchema.statics.signup = async function (userName, password, userType) {
  const exist = await this.findOne({ userName });

  if (!userName || !password || !userType)
    throw Error("Please fill all fields");

  if (!validator.isEmail(userName)) {
    throw Error("UserName is invalid");
  }

  if (exist) {
    throw Error("UserName is already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const singedUser = await this.create({
    userName,
    password: hash,
    userType,
  });

  return singedUser;
};

userSchema.statics.login = async function (userName, password, userType) {
  if (!userName || !password) throw Error("Please fill all fields");

  const user = await this.findOne({ userName, userType });
  if (!user) throw Error("User Name doesn't exist");

  const match = await bcrypt.compare(password, user.password); //returns true or false

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
