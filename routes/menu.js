const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// GET menu by shop ID
// GET menu for a shop
router.get("/", async (req, res) => {
  const { shopID } = req.query;
  if (!shopID) return res.status(400).json({ error: "shopID required" });

  const items = await FoodItem.find({ shopID });
  res.json(items);
});


// POST new menu item
router.post("/", async (req, res) => {
  const { name, price, count, shopID } = req.body;
  const item = new FoodItem({ name, price, count, shopID });
  await item.save();
  res.json({ success: true });
});

// PUT update menu item
router.put("/:id", async (req, res) => {
  const { name, price, count } = req.body;
  await FoodItem.findByIdAndUpdate(req.params.id, { name, price, count });
  res.json({ success: true });
});

// DELETE item
router.delete("/:id", async (req, res) => {
  await FoodItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
