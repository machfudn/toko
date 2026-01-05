const db = require("../config/db");

// GET produk + stok
exports.getProduk = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, s.quantity
      FROM products p
      JOIN stocks s ON p.id = s.product_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil produk" });
  }
};

// CREATE produk
exports.createProduk = async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price]
    );

    await db.query("INSERT INTO stocks (product_id, quantity) VALUES (?, ?)", [
      result.insertId,
      quantity,
    ]);

    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menambahkan produk" });
  }
};

// UPDATE produk
exports.updateProduk = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;

  try {
    await db.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [
      name,
      price,
      id,
    ]);

    await db.query("UPDATE stocks SET quantity = ? WHERE product_id = ?", [
      quantity,
      id,
    ]);

    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: "Gagal update produk" });
  }
};

// DELETE produk
exports.deleteProduk = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM stocks WHERE product_id = ?", [id]);
    await db.query("DELETE FROM products WHERE id = ?", [id]);

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus produk" });
  }
};
