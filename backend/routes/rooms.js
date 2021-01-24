const express = require('express');
const router = express.Router();

const Room = require('../models/room');
const gameImport = require('../models/game');
const Game = gameImport.gameModel;
const User = require('../models/user');
const shortid = require('shortid');
const checkAuth = require('../middleware/check-auth');

 router.post("", checkAuth, (req,res, next) => {
    const room = new Room({
      name: req.body.room.name,
      author: req.body.author,
      imgSrc: req.body.room.imgSrc,
      games: [],
      players:[],
      code: shortid.generate()
    })
    room.save()
    .then(() => {
      res.status(201).json({
      message: 'Room added successfully',
      room: room
      })
    })
    .catch(() => {
      res.status(401).json({
      message: 'Unable to add room'
      });
    });
  });
  
  router.get('',(req, res, next)=>{
    Room.find()
    .then(documents => {
      res.status(200).json({
        message: 'Get /api/rooms called successfully',
        rooms: documents,
      });
    })
  });
  
  router.post('/user',checkAuth, (req,res,next) => {
    Room.find(req.body)
    .then(documents => {
      return res.status(200).json({
        message: 'Get /api/rooms/user called successfully',
        rooms: documents,
      });
    })
  })

  router.post('/user/games', checkAuth, (req,res,next) => {
    Room.find(req.body)
    .then(documents => {
      return res.status(200).json({
        message: 'Get dupa called successfully',
        games: documents.games,
      });
    })
  })

  router.put('/game', checkAuth, (req,res,next) => {
      Room.updateOne(
          {_id: req.body.room._id},
          { $push: {games: req.body.gameName}}
      ).then( result => {
        res.status(200).json({message: 'Game added to room'});
      })
  })

  router.delete('/:id', checkAuth, (req,res,next)=>{
    Room.deleteOne({_id: req.params.id}).then(result => {
      res.status(200).json({message: 'Room deleted'});
    });
  });

module.exports = router;
