const Router = require("express").Router();

const {
  updateNormalUserById,
  findNormalUserById,
  findNormalUser,
} = require("../controllers/normalUser");

Router.get("/:id", findNormalUserById);
Router.get("/", findNormalUser);
Router.patch("/update/:id", updateNormalUserById);

module.exports = Router;
