const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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

