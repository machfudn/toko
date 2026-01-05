# Sistem Admin Toko

Project ini adalah **aplikasi Sistem Admin Toko sederhana** yang terdiri dari **Backend (Express + MySQL)** dan **Frontend (React + Vite)**. Mendukung pengelolaan produk, stok, dan pembelian.

---

## Struktur Project

```
backend-toko/
├── config/
│   ├── db.js
│   └── init.sql
├── controllers/
│   ├── produkController.js
│   └── pembelianController.js
├── middlewares/
│   └── validate.js
├── routes/
│   ├── produkRoute.js
│   └── pembelianRoute.js
├── index.js
├── package.json
└── package-lock.json

frontend-toko/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Modal.jsx
│   │   └── ProductForm.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── package-lock.json
```

---

# BACKEND SETUP (backend-toko)

## 1. Install & Jalankan MySQL

Pastikan MySQL sudah berjalan.

Masuk ke MySQL:

```bash
mysql -u root -p
```

## 2. Import Database dari `init.sql`

Masuk folder `backend-toko/config`:

```bash
cd backend-toko/config
```

Import database:

```bash
mysql -u root -p < init.sql
```

Database `db_toko` dan tabel akan otomatis dibuat.

---

## 3. Konfigurasi Database (`config/db.js`)

Sesuaikan username dan password MySQL:

```js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_toko",
});

module.exports = db;
```

---

## 4. Install Dependency Backend

Masuk folder backend:

```bash
cd backend-toko
npm install
```

---

## 5. Jalankan Backend

```bash
npm run start
```

atau

```bash
npm run dev
```

Jika berhasil:

```
API berjalan di http://localhost:3000
```

---

## 6. Endpoint Backend

### Produk

* GET    `/api/produk`
* POST   `/api/produk`
* PUT    `/api/produk/:id`
* DELETE `/api/produk/:id`

### Pembelian

* GET  `/api/pembelian`
* POST `/api/pembelian`
* POST `/api/pembelian/cancel/:id`

---

# FRONTEND SETUP (frontend-toko)

## 1. Masuk Folder Frontend

```bash
cd frontend-toko
```

---

## 2. Install Dependency Frontend

```bash
npm install
```

---

## 3. Konfigurasi API (Axios)

Pastikan di `App.jsx` atau file API menggunakan base URL:

```js
const API_URL = "http://localhost:3000/api";
```

---

## 4. Jalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```
http://localhost:5173
```

---

## Alur Aplikasi

1. Frontend (React) mengirim request ke backend
2. Backend (Express) memproses request
3. Data disimpan / diambil dari MySQL
4. Response dikirim kembali ke frontend

---

## Fitur Aplikasi

* CRUD Produk
* Manajemen Stok
* Pembelian Produk
* Pembatalan Pembelian
* Riwayat Pembelian

---

## Catatan Penting

* Jalankan **backend terlebih dahulu**, baru frontend
* Pastikan port backend `3000`

---

## Author

Dibuat oleh Machfudin