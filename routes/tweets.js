var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");

router.get("/", (req, res) => {
  if (req.query.hashtag) {
    console.log("Search hashtag");
    Tweet.findOne({ content: { $regex: /#mytest/ } }).then((data) => {
      res.json(data);
    });
  } else {
    console.log("General search");
    Tweet.find().then((data) => {
      res.json(data);
    });
  }
});

router.post("/create", (req, res) => {
  const newTweet = new Tweet({
    author: req.body.author,
    token: req.body.token,
    createdOn: Date.now(),
    content: req.body.content,
    likes: 0,
  });

  newTweet.save().then((data) => {
    res.json({
      result: "ok",
      tweet: {
        id: data._id,
        author: data.author,
        token: data.token,
        createdOn: data.createdOn,
        content: data.content,
        likes: data.likes,
      },
    });
  });
});

router.post("/like", (req, res) => {
  let numberOfLikes = 0;
  Tweet.findOne({ _id: req.query.id }).then((data) => {
    Tweet.updateOne({ _id: req.query.id }, { likes: data.likes + 1 }).then(
      (data) => res.json({ result: true, tweet: { data } })
    );
  });
});

module.exports = router;
