const db = require("../config/db");

// GET riwayat pembelian
exports.getPembelian = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT pu.*, p.name AS product_name
      FROM purchases pu
      JOIN products p ON pu.product_id = p.id
      ORDER BY pu.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil pembelian" });
  }
};

// CREATE pembelian
exports.createPembelian = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    const [[product]] = await db.query(
      "SELECT price FROM products WHERE id = ?",
      [product_id]
    );

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    await db.query(
      "INSERT INTO purchases (product_id, quantity, total_price) VALUES (?,?,?)",
      [product_id, quantity, product.price * quantity]
    );

    await db.query(
      "UPDATE stocks SET quantity = quantity - ? WHERE product_id = ?",
      [quantity, product_id]
    );

    res.json({ message: "Pembelian berhasil" });
  } catch (err) {
    res.status(500).json({ message: "Gagal melakukan pembelian" });
  }
};

// CANCEL pembelian
exports.cancelPembelian = async (req, res) => {
  const { id } = req.params;

  try {
    const [[purchase]] = await db.query(
      "SELECT * FROM purchases WHERE id = ?",
      [id]
    );

    if (!purchase) {
      return res.status(404).json({ message: "Pembelian tidak ditemukan" });
    }

    if (purchase.status === "Batal") {
      return res.status(400).json({ message: "Pembelian sudah dibatalkan" });
    }

    await db.query('UPDATE purchases SET status = "Batal" WHERE id = ?', [id]);

    await db.query(
      "UPDATE stocks SET quantity = quantity + ? WHERE product_id = ?",
      [purchase.quantity, purchase.product_id]
    );

    res.json({ message: "Pembelian dibatalkan" });
  } catch (err) {
    res.status(500).json({ message: "Gagal membatalkan pembelian" });
  }
};
