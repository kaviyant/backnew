const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();

router.get("/", async (req, res) => {
  const shopID = req.query.shop;
  if (!shopID) return res.status(400).send("Missing shop ID");

  try {
    const url = `https://qrstreetmenu.netlify.app?shop=${shopID}`; // your frontend link
    const qrImage = await QRCode.toDataURL(url);
    
    // Return the image data directly (not HTML)
    const imgBuffer = Buffer.from(qrImage.split(",")[1], "base64");
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': imgBuffer.length
    });
    res.end(imgBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("QR generation failed");
  }
});

module.exports = router;
