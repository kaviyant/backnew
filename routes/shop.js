// backend/routes/shop.js
const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// Add shop
router.post('/add', async (req, res) => {
  const { shopName, shopID } = req.body;
  try {
    const shop = new Shop({ shopName, shopID, menu: [] });
    await shop.save();
    res.json({ success: true, shop });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
