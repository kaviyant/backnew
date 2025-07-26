const express = require("express");
const QRCode = require("qrcode");
const router = express.Router();
const Shop = require("../models/Shop");

// Create shop + QR code
router.post("/", async (req, res) => {
  const { shopID } = req.body;
  const url = `https://your-frontend-domain.com/scan.html?shopID=${shopID}`;

  const qrCodeURL = await QRCode.toDataURL(url);
  const shop = new Shop({ shopID, qrCodeURL });
  await shop.save();
  res.json(shop);
});

// Get QR for a shop
router.get("/:shopID", async (req, res) => {
  const { shopID } = req.params;
  const shop = await Shop.findOne({ shopID });
  if (!shop) return res.status(404).json({ error: "Shop not found" });
  res.json(shop);
});

module.exports = router;
