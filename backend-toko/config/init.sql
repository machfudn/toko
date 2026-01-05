-- membuat database db_toko
CREATE DATABASE IF NOT EXISTS db_toko;
-- melakukan pemilihan database yang digunakan db_toko
USE db_toko;

-- membuat tabel products
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT UNSIGNED NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- membuat tabel stocks
CREATE TABLE stocks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- membuat tabel purchases
CREATE TABLE purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  total_price INT UNSIGNED,
  status ENUM('Terjual','Batal') DEFAULT 'Terjual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
  ON DELETE CASCADE ON UPDATE CASCADE
);

-- memasukan data ke tabel products
INSERT INTO products (name, price) VALUES
('Keyboard', 250000),
('Mouse', 150000),
('Monitor', 2200000),
('Laptop', 8500000),
('Flashdisk', 75000),
('Harddisk', 850000),
('Headset', 300000),
('Webcam', 400000),
('Printer', 1800000),
('Speaker', 500000);

-- memasukan data ke tabel stock
INSERT INTO stocks (product_id, quantity)
SELECT id, 50 FROM products;
