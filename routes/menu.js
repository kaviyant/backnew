const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Get menu by shopID
router.get('/:shopID', async (req, res) => {
  const menu = await FoodItem.find({ shopID: req.params.shopID });
  res.json(menu);
});

// Add new item
router.post('/', async (req, res) => {
  const { name, price, count, shopID } = req.body;
  const newItem = new FoodItem({ name, price, count, shopID, available: true });
  await newItem.save();
  res.sendStatus(201);
});

// Delete item
router.delete('/:id', async (req, res) => {
  await FoodItem.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Update item
router.put('/:id', async (req, res) => {
  const { name, price, count } = req.body;
  await FoodItem.findByIdAndUpdate(req.params.id, { name, price, count });
  res.sendStatus(200);
});

module.exports = router;
