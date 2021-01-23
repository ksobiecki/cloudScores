const mongoose = require('mongoose')
const gameImport = require('./game');

const gameSchema = gameImport.gameSchema;

const roomSchema = mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    imgSrc: {type: String, required: true},
    games: {type: [gameSchema]},
    players:{type: [String]}
});

module.exports = mongoose.model('Room', roomSchema);
