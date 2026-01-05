const express = require("express");
const cors = require("cors");

const produkRoute = require("./routes/produkRoute");
const pembelianRoute = require("./routes/pembelianRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/produk", produkRoute);
app.use("/api/pembelian", pembelianRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`API berjalan di http://localhost:${port}`);
});
