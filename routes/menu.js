const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem");

// ✅ GET menu items for a shop using query param ?shopID=xxx
router.get("/", async (req, res) => {
  const { shopID } = req.query;
  if (!shopID) {
    return res.status(400).json({ error: "shopID is required" });
  }

  try {
    const items = await FoodItem.find({ shopID });
    res.json(items);
  } catch (err) {
    console.error("Error fetching menu:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST a new menu item
router.post("/", async (req, res) => {
  const { name, price, count, shopID } = req.body;

  if (!name || !price || !count || !shopID) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const item = new FoodItem({ name, price, count, shopID });
    await item.save();
    res.json({ success: true });
  } catch (err) {
    console.error("Error saving item:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ PUT to update an item by its ID
router.put("/:id", async (req, res) => {
  const { name, price, count } = req.body;

  try {
    await FoodItem.findByIdAndUpdate(req.params.id, { name, price, count });
    res.json({ success: true });
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE an item by its ID
router.delete("/:id", async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
