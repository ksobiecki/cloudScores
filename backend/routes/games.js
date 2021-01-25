const express = require('express');
const router = express.Router();

const shortid = require('shortid');

const gameImport = require('../models/game')
const Game = gameImport.gameModel;
const checkAuth = require("../middleware/check-auth");

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
  })

module.exports = router;
