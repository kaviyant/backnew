const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  shopID: String,
  qrCodeURL: String
});

module.exports = mongoose.model("Shop", ShopSchema);
