const express = require('express');
const router = express.Router();

const Room = require('./models/room');
const gameImport = require('./models/game')
const Game = gameImport.gameModel;
const User = require('./models/user');
const shortid = require('shortid');

 router.post("", (req,res, next) => {
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
  
  router.post('/user',(req,res,next) => {
    //console.log(req.body);
    Room.find(req.body)
    .then(documents => {
      console.log(documents);
      return res.status(200).json({
        message: 'Get /api/rooms/user called successfully',
        rooms: documents,
      });
    })
  })

