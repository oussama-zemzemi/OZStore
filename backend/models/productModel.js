// models/productModel.js
import db from '../config/db.js';

export const findAllProducts = async () => {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
};

export const findProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

export const insertProduct = async (product) => {
  const { name, price, description, image_url, category } = product;
  const [result] = await db.query(
    'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
    [name, price, description, image_url, category]
  );
  return result.insertId;
};

export const updateProductById = async (id, product) => {
  const { name, price, description, image_url, category } = product;
  await db.query(
    'UPDATE products SET name=?, price=?, description=?, image_url=?, category=? WHERE id=?',
    [name, price, description, image_url, category, id]
  );
};

export const deleteProductById = async (id) => {
  await db.query('DELETE FROM products WHERE id = ?', [id]);
};
