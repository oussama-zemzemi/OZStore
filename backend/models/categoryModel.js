// models/categoryModel.js
import db from '../config/db.js';

// Get all categories
export const findAllCategories = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

// Find category by name (for uniqueness check)
export const findCategoryByName = async (name) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE name = ?', [name]);
  return rows[0];
};

// Insert a new category
export const insertCategory = async (name) => {
  const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
  return result.insertId;
};

