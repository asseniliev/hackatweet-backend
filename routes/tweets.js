var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");
const User = require("../models/users");

//localhost:3000/tweets/
//method: GET
//query parameter: hash
router.get("/", (req, res) => {
  if (req.query.hashtag) {
    Tweet.find({ content: { $regex: req.query.hashtag } })
      .populate("user")
      .populate("likes")
      .then((data) => {
        res.json(data);
      });
  } else {
    console.log("General search");
    Tweet.find()
      .populate("user")
      .populate("likes")
      .then((data) => {
        res.json(data);
      });
  }
});

//localhost:3000/tweets/create
//method: POST
//body.username
//body.token
//body.content -> the text of the tweet
router.post("/create", (req, res) => {
  User.findOne({ username: req.body.username, token: req.body.token }).then(
    (data) => {
      if (data) {
        console.log("Start creating user " + data._id);

        const newTweet = new Tweet({
          user: data._id,
          token: req.body.token,
          createdOn: Date.now(),
          content: req.body.content,
          likes: [],
        });

        console.log("Start creating user 2");
        newTweet.save().then((data) => {
          res.json({
            result: true,
            tweet: data,
          });
        });
      } else {
        res.json({ result: false, message: "Username or token not valid!" });
      }
    }
  );
});

//localhost:3000/tweets/like
//method: POST
//body.username
//body.token
//body.tweetId
router.post("/like", (req, res) => {
  User.findOne({ username: req.body.username, token: req.body.token }).then(
    (data) => {
      if (data) {
        let userId = data._id;
        Tweet.findOne({ _id: req.body.tweetId }).then((data) => {
          console.log();
          const newLikes = data.likes;
          newLikes.push(userId);
          console.log();
          Tweet.updateOne({ _id: req.body.tweetId }, { likes: newLikes }).then(
            (data) => res.json({ result: true, tweet: data })
          );
        });
      } else {
        res.json({ result: false, message: "Username or token not valid!" });
      }
    }
  );
});

router.delete("/", (req, res) => {
  Tweet.deleteOne({ _id: req.query.id }).then((data) => {
    res.json({ result: true, tweet: data });
  });
});

module.exports = router;
