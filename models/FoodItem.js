const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  count: Number,
  available: { type: Boolean, default: true },
  shopID: String
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
