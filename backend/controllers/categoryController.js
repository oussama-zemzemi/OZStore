// ✅ categoryController.js
import db from '../config/db.js';

export const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error getting categories:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  try {
    const [existing] = await db.query('SELECT * FROM categories WHERE name = ?', [name]);
    if (existing.length) return res.status(409).json({ message: 'Category already exists' });

    await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.status(201).json({ message: 'Category created' });
  } catch (err) {
    console.error('❌ Error creating category:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
