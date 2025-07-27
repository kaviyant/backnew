require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const menuRoutes = require("./routes/menu");
const shopRoutes = require("./routes/shop");
const qrRoutes = require("./routes/qr"); // ✅ Step 4

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

app.use("/api/menu", menuRoutes);
app.use("/api/shop", shopRoutes);
app.use("/qr", qrRoutes); // ✅ Step 4

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
