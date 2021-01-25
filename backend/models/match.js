const mongoose = require('mongoose');
const gameImport = require('./game');
const winnerImport = require('./winner')

const gameSchema = gameImport.gameSchema;
const winnerSchema = winnerImport.winnerSchema;

const matchSchema = mongoose.Schema({
  game: {type: gameSchema, required:true},
  duration: {type: Number, required: true},
  date: {type: String, required: true},
  players: {type: [String], required: true},
  winners: {type: [winnerSchema], required: true}
});

module.exports = {
  matchModel: mongoose.model('Match', matchSchema),
  matchSchema: module.exports = matchSchema
}
