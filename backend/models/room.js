const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: {type: String, required: true},
  imgURL: String
});

const roomSchema = mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    imgSrc: {type: String, required: true},
    games: gameSchema,
    players:[String]
});

module.exports = mongoose.model('Room',roomSchema);
