const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Room = require('./models/room');
const Game = require('./models/game')

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
    console.log(documents);
  })

  const rooms=[
    {
      id: 1,
      name: 'Room1',
      author: 'Krzyś',
      imgSrc: '../../assets/img/avatar1.png',
      games: [
        {
          id: 1,
          name: 'Kalambury',
          imgUrl:
            'https://files.rebel.pl/products/100/1437/_107584/gra-imprezowa-mdr-gierki-malzenskie-kalambury-pudelko-1200x900-ffffff.png',
        },
      ],
      players: ['Krzyś'],
    },
    { id: 2, name: 'Room2', author: 'Piter', imgSrc: '../../assets/img/avatar11.png', games: [], players: [] },
    { id: 3, name: 'Room3', author: 'Pyć', imgSrc: '../../assets/img/avatar13.png', games: [], players: [] }

  ]
  res.status(200).json({
    message: 'testowy get na roomy',
    rooms:rooms,
  });

  console.log('Wywolanie geta /api/rooms');
});

app.post('/api/users', (req, res, next) => {

})

module.exports = app;
