const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: String,
  username: String,
  token: String,
  password: String,
  photo: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
