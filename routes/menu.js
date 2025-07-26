const express = require("express");
const router = express.Router();
const Shop = require("../models/Shop");

// Get menu for a shop
router.get("/menu", async (req, res) => {
  const { shopID } = req.query;
  if (!shopID) return res.status(400).json({ error: "shopID required" });

  const shop = await Shop.findOne({ shopID });
  if (!shop) return res.status(404).json({ error: "Shop not found" });

  res.json(shop.menu);
});

// Add or update item in a shop menu
router.post("/menu", async (req, res) => {
  const { shopID, item } = req.body;
  if (!shopID || !item) return res.status(400).json({ error: "Invalid data" });

  let shop = await Shop.findOne({ shopID });
  if (!shop) {
    shop = new Shop({ shopID, menu: [item] });
  } else {
    const index = shop.menu.findIndex((i) => i.name === item.name);
    if (index !== -1) {
      shop.menu[index] = item; // update
    } else {
      shop.menu.push(item); // add
    }
  }

  await shop.save();
  res.json({ success: true, menu: shop.menu });
});

module.exports = router;
