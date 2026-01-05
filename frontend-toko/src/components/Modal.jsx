export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // klik luar modal
    >
      <div
        onClick={(e) => e.stopPropagation()} // cegah close saat klik isi modal
        className="bg-white w-full max-w-md rounded-xl shadow-lg transform transition-all scale-100 animate-modal p-6 relative"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div>{children}</div>
      </div>
    </div>
  );
}
