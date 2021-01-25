const mongoose = require('mongoose')
const gameImport = require('./game');
const uniqueValidator = require('mongoose-unique-validator');

const gameSchema = gameImport.gameSchema;

const roomSchema = mongoose.Schema({
    name: {type: String, required: true, index: true, unique: true, maxlength: 14},
    author: {type: String, required: true},
    imgSrc: {type: String, required: true},
    games: {type: [gameSchema]},
    players:{type: [String]},
    code: String
});

roomSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Room', roomSchema);
