// utils/jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // ✅ payload must be an object
    process.env.JWT_SECRET,
    { expiresIn: '1d' } // ✅ valid format
  );
};

