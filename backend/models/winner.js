const mongoose = require("mongoose");

const winnerSchema = mongoose.Schema({
  place: { type: Number, required: true },
  player: { type: String, required: true },
});

module.exports = {
  winnerModel: mongoose.model("Winner", winnerSchema),
  winnerSchema: (module.exports = winnerSchema),
};
