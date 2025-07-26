const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('YOUR_MONGODB_URI');

app.use('/api/menu', require('./routes/menu'));

// Serve QR image
app.get('/qr', async (req, res) => {
  const shopID = req.query.shop;
  const scanURL = `http://localhost:5500/scan.html?shop=${shopID}`;
  const qr = await qrcode.toDataURL(scanURL);
  const img = Buffer.from(qr.split(",")[1], 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': img.length
  });
  res.end(img);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
