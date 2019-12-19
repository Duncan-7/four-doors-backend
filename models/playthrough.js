const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaythroughSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    winnings: { type: Number, required: true },
    round: { type: Number, required: true },
    complete: { type: Boolean, required: true },
    updated: { type: Date, required: true }
  }
)

module.exports = mongoose.model('Playthrough', PlaythroughSchema);