const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  author: String,
  token: String,
  createdOn: Date,
  content: String,
  likes: Number,
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
