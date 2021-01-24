const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: {type: String, required: true},
  imgUrl: String
});

module.exports = {
    gameModel: mongoose.model('Game', gameSchema),
    gameSchema: module.exports = gameSchema
}