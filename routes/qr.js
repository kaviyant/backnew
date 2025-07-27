const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.get('/', async (req, res) => {
  const shopID = req.query.shop;
  if (!shopID) return res.status(400).send('Missing shop ID');

  try {
    const qrDataURL = await QRCode.toDataURL(`https://your-shop-url.com/menu/${shopID}`);
    const img = Buffer.from(qrDataURL.split(",")[1], 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } catch (err) {
    res.status(500).send('QR generation failed');
  }
});

module.exports = router;
