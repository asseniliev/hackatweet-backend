const mongoose = require("mongoose");

// const connectionString = process.env.CONNECTION_STRING;

// const connectionString = process.env.MONGODB_KEY;
const connectionString =
  "mongodb+srv://admin:MyCon42DBClus1Now131@cluster0.8ikevav.mongodb.net/tweeter";

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
