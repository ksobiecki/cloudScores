const express = require("express");
const router = express.Router();

const shortid = require("shortid");

const gameImport = require("../models/game");
const Game = gameImport.gameModel;
const Room = require("../models/room");

//sciagniecie wszystkich gierek
router.get("", (req, res, next) => {
  Game.find().then((documents) => {
    res.status(200).json({
      message: "Get /api/games called successfully",
      games: documents,
    });
  });
});

//tworzenie gierki
router.post("/", (req, res, next) => {
  const game = new Game({
    name: "name",
    imgUrl: "someURL",
  });
  game
    .save()
    .then(() => {
      res.status(201).json({
        message: "Game added successfully",
      });
    })
    .catch(() => {
      res.status(401).json({
        message: "Unable to add game",
      });
    });
});

router.post("/:username", (req, res, next) => {
  let gameName = [String];
  let gamesPlayed = [Number];
  let totalScore = [Number];
  Room.find(req.body).then((result) => {
    let object = result;
    for (let obj of object) {
      //for po roomsach
      let players = obj.matches;
      for (let obj2 of players) {
        //for po matchach
        if (obj2.players.includes(req.params.username)) {
          if (!gameName.includes(obj2.game.name)) {
            gameName.push(obj2.game.name);
            gamesPlayed.push(1);
            totalScore.push(0);
          } else {
            gamesPlayed[gameName.indexOf(obj2.game.name)]++;
          }
          let winers = obj2.winners;
          for (let win of obj2.winners) {
            if (win.player === req.params.username) {
              if (win.place == 1) {
                totalScore[gameName.indexOf(obj2.game.name)] += 100;
              }
              if (win.place == 2) {
                totalScore[gameName.indexOf(obj2.game.name)] += 50;
              }
              if (win.place == 3) {
                totalScore[gameName.indexOf(obj2.game.name)] += 25;
              }
            }
          }
        }
      }
    }
    var array = [];
    for (let i = 1; i < gameName.length; i++) {
      let gameVal = gameName[i];
      let gamesVal = gamesPlayed[i];
      let totalVal = totalScore[i];
      array.push({
        gameName: gameVal,
        gamesPlayed: gamesVal,
        totalScore: totalVal,
      });
    }
    res.status(200).json({
      results: array
    })
  });
});
module.exports = router;
