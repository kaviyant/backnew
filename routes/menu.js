const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// GET menu for shop
router.get("/:shopID", async (req, res) => {
  const { shopID } = req.params;
  const items = await FoodItem.find({ shopID });
  res.json(items);
});

// POST add food item
router.post("/", async (req, res) => {
  const item = new FoodItem(req.body);
  await item.save();
  res.json(item);
});

// PUT update item
router.put("/:id", async (req, res) => {
  const updated = await FoodItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE item
router.delete("/:id", async (req, res) => {
  await FoodItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
