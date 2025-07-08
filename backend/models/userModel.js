// models/userModel.js
import db from '../config/db.js';

export const createUser = async (email, hashedPassword, role = 'user') => {
  const [result] = await db.query(
    'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
    [email, hashedPassword, role]
  );
  return result.insertId;
};

export const getUserByEmail = async (email) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};
