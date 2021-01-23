const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: {type: String, required: true},
  imgURL: String
});

module.exports = {
    gameModel: mongoose.model('Game', gameSchema),
    gameSchema: module.exports = gameSchema
}