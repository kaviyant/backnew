require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const shopRoutes = require("./routes/shop");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "https://kaviyant.github.io"
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("QR Menu Backend is live 🎉");
});

// ⬇️ ADD THIS NEW ROUTE BELOW 👇
app.get("/qr", (req, res) => {
  const shopID = req.query.shop;
  const customerURL = `https://kaviyant.github.io/fronnew/scan.html?shop=${shopID}`;
  const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(customerURL)}&size=200x200`;
  res.redirect(qrAPI);
});
// ⬆️ END OF NEW ROUTE

app.use("/api/menu", menuRoutes);
app.use("/api/shop", shopRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
