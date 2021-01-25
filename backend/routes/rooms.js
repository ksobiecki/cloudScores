const express = require("express");
const router = express.Router();

const Room = require("../models/room");
const gameImport = require("../models/game");
const Game = gameImport.gameModel;
const User = require("../models/user");
const shortid = require("shortid");
const checkAuth = require("../middleware/check-auth");
const room = require("../models/room");
const Match = require("../models/match")
const Winner = require("../models/winner")

router.post("", checkAuth, (req, res, next) => {
  const room = new Room({
    name: req.body.room.name,
    author: req.body.author,
    imgSrc: req.body.room.imgSrc,
    games: [],
    players: [req.body.author],
    matches:[],
    code: shortid.generate(),
  });
  room
    .save()
    .then(() => {
      res.status(201).json({
        message: "Room added successfully",
        room: room,
      });
    })
    .catch(() => {
      res.status(401).json({
        message: "Unable to add room",
      });
    });
});

router.get("", (req, res, next) => {
  Room.find().then((documents) => {
    res.status(200).json({
      message: "Get /api/rooms called successfully",
      rooms: documents,
    });
  });
});

  router.post('/user',(req,res,next) => {
    Room.find(req.body)
    .then(documents => {
      return res.status(200).json({
        message: 'Get /api/rooms/user called successfully',
        rooms: documents,
      });
    })
  })

  router.get('/:name/games', (req, res, next) => {
    Room.find({name: req.params.name}, 'games')
    .then(documents => {
      return res.status(200).json({
        message: 'Get games for room',
        games: documents
      })
    }).catch(err => console.log(err));
  })

  router.put('/game', (req,res,next) => {
        Room.updateOne(
            {_id: req.body.room._id},
            { $push: {games: req.body.gameName}}
        ).then( result => {
          res.status(200).json({message: 'Game added to room'});
        })
    })

 router.put("/:code", (req, res, next) => {
  Room.updateOne(
    { code: req.params.code },
    { $push: { players: req.body.newUser } }
  )
    .then((result) => {
      res.status(200).json({ message: "User added to room" });
    })
    .catch(err => console.log(err));
});

router.put("/game", checkAuth, (req, res, next) => {
  Room.updateOne(
    { _id: req.body.room._id },
    { $push: { games: req.body.gameName } }
  ).then((result) => {
    res.status(200).json({ message: "Game added to room" });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Room.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Room deleted" });
  });
});

router.post("/user/leave/:username", (req, res, next) => {
  console.log(req.body.name)
  Room.findOne({ name: req.body.name })
    .then((result) => {
      let array = result.players;
      const index = array.indexOf(req.params.username);
      if (index > -1) {
        array.splice(index, 1);
      }
      Room.updateOne({ name: req.body.name }, { $set: { players: array } })
      .then((result) => {
        res.status(200).json({
          message: 'udalo sie wyjsc z pokoja'
        })
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(402).json({ message: "Unable to leave room" });
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

    router.get('/:roomName/:gameName', (req, res, next) =>{
      Room.findOne({
        roomName: req.params.name,
        gameName: req.params.gameName
      }, 'matches').then(documents => {
        res.status(200).json({
          message: 'Get matches for chosen room for chosen game called successfully',
          matches: documents,
        });
      })
      Match.find(req.params.gameName).then(documents => {
        res.status(200).json({
          message: 'Get matches for room for game',
          matches:documents
        })
      }).catch(err => console.log(err));
      })

    router.put('/:roomId/:gameId', (req, res, next) =>{
      Room.updateOne({_id: req.params.roomId},
        {$push: {matches: req.body.match}})
        .then( result => {
          res.status(200).json({message: 'Match added to room matches'
        })
        .catch(err => console.log(err));
        })
    })

module.exports = router;
