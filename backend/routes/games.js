const express = require('express');
const router = express.Router();

const shortid = require('shortid');

const gameImport = require('../models/game')
const Game = gameImport.gameModel;
const checkAuth = require("../middleware/check-auth");
const Room = require('../models/room')

  //sciagniecie wszystkich gierek
  router.get('', checkAuth, (req, res, next)=>{
    Game.find()
    .then(documents => {
      res.status(200).json({
        message: 'Get /api/games called successfully',
        games: documents,
      });
    })
  });

  //tworzenie gierki
  router.post('/', checkAuth, (req,res,next) => {
    const game = new Game({
      name: 'name',
      imgUrl: 'someURL'
    })
    game.save()
    .then(() => {
      res.status(201).json({
      message: 'Game added successfully'
      })
    })
    .catch(() => {
      res.status(401).json({
      message: 'Unable to add game'
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
      results: array,
    });
  });
});

router.post("/stats/game", (req, res, next) => {
  let playerNames = [String];
  let gamesPlayed = [Number];
  let gamesWon = [Number];
  let totalScore = [Number];
  Room.find().then((result) => {
    let roomArray = result;
    for (let room of roomArray) {
      let matches = room.matches;
      for (let match of matches) {
        let players = match.players;
        if (match.game.name === req.body.name) {
          for (let player of players) {
            if (!playerNames.includes(player)) {
              playerNames.push(player);
              gamesPlayed.push(1);
              gamesWon.push(0);
              totalScore.push(0);
            } else {
              gamesPlayed[playerNames.indexOf(player)]++;
            }
          }
          let winners = match.winners;
          for(let winner of winners){
            for(let play of playerNames){
              if(winner.player == play){
                if(winner.place == 1){
                  gamesWon[playerNames.indexOf(play)]++;
                  totalScore[playerNames.indexOf(play)]+=100;
                }
                if(winner.place == 2){
                  totalScore[playerNames.indexOf(play)]+=50;
                }
                if(winner.place == 3){
                  totalScore[playerNames.indexOf(play)]+=25;
                }
              }
            }
          }
        }
      }
    }
    let array = [];
    for (let i = 1; i < playerNames.length; i++){
      ///console.log(playerNames[i])
      array.push({
        playerName: playerNames[i],
        gamesPlayed: gamesPlayed[i],
        gamesWon: gamesWon[i],
        totalScore: totalScore[i]
      })
    }

    //console.log(array);
    res.status(200).json({
      results: array,
    });
  })
});

module.exports = router;
