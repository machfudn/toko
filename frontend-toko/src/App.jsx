import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "./components/Modal";
import ProductForm from "./components/ProductForm";

function App() {
  const apiUrl = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingPurchase, setLoadingPurchase] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buyQty, setBuyQty] = useState(1);

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchPurchases();
  }, []);

  // ========================
  // Helpers
  // ========================
  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);

  const showLoading = (title = "Memproses...") => {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
  };

  // ========================
  // API Calls
  // ========================
  const fetchProducts = async () => {
    setLoadingProduct(true);
    try {
      const res = await axios.get(`${apiUrl}/produk`);
      setProducts(res.data);
    } catch {
      Swal.fire("Gagal", "Gagal mengambil produk", "error");
    } finally {
      setLoadingProduct(false);
    }
  };

  const fetchPurchases = async () => {
    setLoadingPurchase(true);
    try {
      const res = await axios.get(`${apiUrl}/pembelian`);
      setPurchases(res.data);
    } catch {
      Swal.fire("Gagal", "Gagal mengambil riwayat pembelian", "error");
    } finally {
      setLoadingPurchase(false);
    }
  };

  // ========================
  // PEMBELIAN
  // ========================
  const submitPembelian = async () => {
    if (!buyQty || buyQty < 1) {
      Swal.fire("Error", "Qty minimal 1", "error");
      return;
    }

    if (buyQty > selectedProduct.quantity) {
      Swal.fire("Error", "Qty melebihi stok", "error");
      return;
    }

    try {
      showLoading("Memproses pembelian...");
      await axios.post(`${apiUrl}/pembelian`, {
        product_id: selectedProduct.id,
        quantity: Number(buyQty),
      });

      Swal.close();
      Swal.fire("Berhasil", "Pembelian berhasil", "success");
      setOpenBuyModal(false);
      fetchProducts();
      fetchPurchases();
    } catch {
      Swal.close();
      Swal.fire("Gagal", "Gagal melakukan pembelian", "error");
    }
  };

  const cancelPembelian = async (id) => {
    const result = await Swal.fire({
      title: "Batalkan Pembelian?",
      text: "Pembelian akan dikembalikan ke stok",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Batalkan",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      showLoading("Membatalkan...");
      await axios.post(`${apiUrl}/pembelian/cancel/${id}`);
      Swal.close();
      Swal.fire("Berhasil", "Pembelian dibatalkan", "success");
      fetchProducts();
      fetchPurchases();
    } catch {
      Swal.close();
      Swal.fire("Gagal", "Gagal membatalkan pembelian", "error");
    }
  };

  // ========================
  // PRODUK
  // ========================
  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      showLoading("Menyimpan produk...");
      if (editProduct) {
        await axios.put(`${apiUrl}/produk/${editProduct.id}`, form);
      } else {
        await axios.post(`${apiUrl}/produk`, form);
      }

      Swal.close();
      Swal.fire("Berhasil", "Produk berhasil disimpan", "success");
      setOpenModal(false);
      fetchProducts();
    } catch {
      Swal.close();
      Swal.fire("Gagal", "Gagal menyimpan produk", "error");
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Produk?",
      text: "Produk akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      showLoading("Menghapus...");
      await axios.delete(`${apiUrl}/produk/${id}`);
      Swal.close();
      Swal.fire("Berhasil", "Produk berhasil dihapus", "success");
      fetchProducts();
    } catch {
      Swal.close();
      Swal.fire("Gagal", "Gagal menghapus produk", "error");
    }
  };

  // ========================
  // UI
  // ========================
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-8">Admin Pembelian Toko</h1>

      {/* PRODUK */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <button
          onClick={() => {
            setEditProduct(null);
            setForm({ name: "", price: "", quantity: "" });
            setOpenModal(true);
          }}
          className="bg-green-600 text-white px-4 py-1 mb-4 rounded"
        >
          Tambah Produk
        </button>

        {loadingProduct ? (
          <div className="h-40 flex items-center justify-center">
            <p>Loading produk...</p>
          </div>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">No</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Stok</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{formatRupiah(p.price)}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setBuyQty(1);
                        setOpenBuyModal(true);
                      }}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Beli
                    </button>
                    <button
                      onClick={() => {
                        setEditProduct(p);
                        setForm(p);
                        setOpenModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL PRODUK */}
      <Modal
        open={openModal}
        title={editProduct ? "Edit Produk" : "Tambah Produk"}
        onClose={() => setOpenModal(false)}
      >
        <ProductForm
          data={form}
          onChange={setForm}
          submitText="Simpan"
          onSubmit={saveProduct}
        />
      </Modal>

      {/* MODAL BELI */}
      <Modal
        open={openBuyModal}
        title="Pembelian Produk"
        onClose={() => setOpenBuyModal(false)}
      >
        {selectedProduct && (
          <>
            <p className="font-semibold mb-2">{selectedProduct.name}</p>
            <input
              type="number"
              value={buyQty}
              onChange={(e) => setBuyQty(e.target.value)}
              className="w-full border px-3 py-2 mb-2"
            />
            <input
              disabled
              value={formatRupiah(buyQty * selectedProduct.price)}
              className="w-full border px-3 py-2 bg-gray-100 mb-4"
            />
            <button
              onClick={submitPembelian}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Konfirmasi
            </button>
          </>
        )}
      </Modal>

      {/* RIWAYAT */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold mb-4">Riwayat Pembelian</h2>
        {loadingPurchase ? (
          <div className="h-40 flex items-center justify-center">
            <p>Loading Riwayat pembelian...</p>
          </div>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-3">No</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p, index) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{p.product_name}</td>
                  <td className="p-3">{p.quantity}</td>
                  <td className="p-3">{formatRupiah(p.total_price)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        p.status === "Terjual"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>{" "}
                  <td className="p-3">
                    {p.status === "Terjual" && (
                      <button
                        onClick={() => cancelPembelian(p.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Batalkan
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
