exports.validateProduk = (req, res, next) => {
  const { name, price, quantity } = req.body;

  if (!name || price == null || quantity == null) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  if (price <= 0 || quantity < 0) {
    return res.status(400).json({ message: "Price / quantity tidak valid" });
  }

  next();
};

exports.validatePembelian = (req, res, next) => {
  const { product_id, quantity } = req.body;

  if (!product_id || quantity == null) {
    return res
      .status(400)
      .json({ message: "Product dan quantity wajib diisi" });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity harus lebih dari 0" });
  }

  next();
};
