const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Room = require('./models/room');
const gameImport = require('./models/game')
const Game = gameImport.gameModel;

const app = express();

const db = mongoose.connect("mongodb+srv://cloudScores_admin:ZPh5bEUem9Kk08Az@cluster.bq0o1.mongodb.net/cloudScores_db?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Failed to connect database');
});

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/games', (req,res,next) => {
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

app.post("/api/rooms", (req,res, next) => {
  const room = new Room({
    name: req.body.name,
    author: "author",
    imgSrc: req.body.imgSrc,
    games: [],
    players:[]
  })

  room.save()
  .then(() => {
    res.status(201).json({
    message: 'Room added successfully'
    })
  })
  .catch(() => {
    res.status(401).json({
    message: 'Unable to add room'
    });
  });
});

app.get('/api/rooms',(req, res, next)=>{
  Room.find()
  .then(documents => {
    res.status(200).json({
      message: 'Get /api/rooms called successfully',
      rooms:documents,
    });
  })
});

app.post('/api/users', (req, res, next) => {

})



module.exports = app;
