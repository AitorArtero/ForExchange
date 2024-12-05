const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exchangeRateId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Favorite', favoriteSchema);
