const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const checkAuth = require("../middleware/check-auth");
const Game = require("../models/game");
const Room = require("../models/room");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }).then((documents) => {
    if (documents == null) {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.status(201).json({
              message: "User added successfully",
            });
          })
          .catch(() => {
            res.status(401).json({
              message: "Unable to add user",
            });
          });
      });
    } else {
      res.status(402).json({
        message: "User already exists",
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          username: fetchedUser.username,
        },
        "dlugi_ciag_znakow_tu_musi_byc",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        user: fetchedUser,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/mystats", checkAuth, (req, res, next) => {
  Room.find({
    players: req.body.username,
    matches: { players: req.body.username },
  }).then((response) => {
    return res.status(200).json({
      message: "mystats",
      rooms: response,
    });
  });
});

module.exports = router;
