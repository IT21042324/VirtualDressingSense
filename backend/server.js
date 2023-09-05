const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const storeOwnerRoutes = require("./routes/storeOwner");
const normalUserRoutes = require("./routes/normalUser");
const userRoutes = require("./routes/user");
const storeRoutes = require("./routes/store");
const itemRoutes = require("./routes/item");
const brandRoutes = require("./routes/brand");
const requireAuth = require("./middleware/requireAuth");

//Creating an express app
const app = express();

// Configure middleware functions
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Get port number and database URI from environment variables
const PORT = process.env.PORT;
const URI = process.env.URI;

// Connect to MongoDB database and start server
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connection to MongoDB successful");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/users", userRoutes);
app.use("/api/storeOwners", storeOwnerRoutes);
app.use("/api/normalUsers", normalUserRoutes);

app.use(requireAuth);
app.use("/api/stores", storeRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/brands", brandRoutes);
