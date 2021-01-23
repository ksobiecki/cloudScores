const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: {type: String, required: true},
  imgURL: String
});

module.exports = mongoose.model('Game', gameSchema);
