// controllers/productController.js
import db from '../config/db.js';

export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, image_url, category } = req.body;

  if (!name || !price || !description || !image_url || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.query(
      'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, image_url, category]
    );
    res.status(201).json({ message: 'Product created' });
  } catch (err) {
    console.error('❌ Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image_url, category } = req.body;

  try {
    await db.query(
      'UPDATE products SET name=?, price=?, description=?, image_url=?, category=? WHERE id=?',
      [name, price, description, image_url, category, id]
    );
    res.json({ message: 'Product updated' });
  } catch (err) {
    console.error('❌ Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('❌ Error deleting product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
