const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Room = require('./models/room');
const gameImport = require('./models/game')
const Game = gameImport.gameModel;
const User = require('./models/user');
const shortid = require('shortid')

const app = express();

const db = mongoose.connect("mongodb+srv://cloudScores_admin:ZPh5bEUem9Kk08Az@cluster.bq0o1.mongodb.net/cloudScores_db?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Failed to connect database');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
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

app.post('/api/users', (req, res, next) => {
  User.findOne(
    { email: req.body.email }
  ).then(documents => {
    console.log('api users get and');
    console.log(documents);

    if(documents == null)
      {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        user.save()
        .then(() => {
          res.status(201).json({
          message: 'User added successfully'
          })
        })
        .catch(() => {
          res.status(401).json({
          message: 'Unable to add user'
          });
        });
      }
      else {
        res.status(402).json({
        message: 'User already exists'
        });
      }

  });

})

app.post("/api/rooms", (req,res, next) => {
  console.log(req.body);
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
      rooms: documents,
    });
  })
});

app.post('/api/rooms/user',(req,res,next) => {
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

app.post('/api/users/login', (req,res,next) => {
  User.findOne(
    { email: req.body.email }
  ).then(documents => {
    return res.status(200).json({
      message: 'Get /api/users/email called successfully',
      user: documents,
  });
  });
});

app.get('/api/games',(req, res, next)=>{
  Game.find()
  .then(documents => {
    res.status(200).json({
      message: 'Get /api/games called successfully',
      games: documents,
    });
  })
});



module.exports = app;
