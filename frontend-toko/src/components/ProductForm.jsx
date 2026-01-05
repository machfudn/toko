export default function ProductForm({ data, onChange, onSubmit, submitText }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nama produk"
        className="w-full border rounded px-3 py-2"
        value={data.name}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Harga"
        className="w-full border rounded px-3 py-2"
        value={data.price}
        onChange={(e) => onChange({ ...data, price: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Stok"
        className="w-full border rounded px-3 py-2"
        value={data.quantity}
        onChange={(e) => onChange({ ...data, quantity: e.target.value })}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
