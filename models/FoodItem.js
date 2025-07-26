const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  count: Number,
  shopID: String
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);
