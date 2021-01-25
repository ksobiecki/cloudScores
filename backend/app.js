const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const roomsRoutes = require('./routes/rooms');
const gamesRoutes = require('./routes/games');
const usersRoutes = require('./routes/users');

const db = mongoose.connect("mongodb+srv://cloudScores_admin:ZPh5bEUem9Kk08Az@cluster.bq0o1.mongodb.net/cloudScores_db", { useNewUrlParser: true,  useUnifiedTopology: true})
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Failed to connect database');
});

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Entries, X-Requested-With, X-Auth-Token, Content-Type, Accept, Authorization, authorization, delete"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  if ('OPTIONS' == req.method) {
    res.status(200);
  }
  else {
    next();
  }
});

app.use('/api/rooms', roomsRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;
