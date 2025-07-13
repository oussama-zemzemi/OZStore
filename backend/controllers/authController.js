// controllers/authController.js
import bcrypt from 'bcryptjs';
import { getUserByEmail, createUser } from '../models/userModel.js';
import { generateToken } from '../utils/jwt.js';

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user.id);

    res.status(200).json({
      id: user.id,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Register controller
export const register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashedPassword, role || 'user');
    const token = generateToken(userId);

    res.status(201).json({
      id: userId,
      email,
      role: role || 'user',
      token,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

``


