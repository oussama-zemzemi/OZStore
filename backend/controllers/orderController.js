// ✅ orderController.js
import db from '../config/db.js';

export const createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user?.id;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items provided' });
  }

  try {
    const [orderResult] = await db.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
    const orderId = orderResult.insertId;

    const orderItems = items.map(item => [orderId, item.product_id, item.quantity]);
    await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
      [orderItems]
    );

    res.status(201).json({ message: 'Order created', orderId });
  } catch (err) {
    console.error('❌ Error creating order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrdersByUser = async (req, res) => {
  const userId = req.user?.id;

  try {
    const [orders] = await db.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
    res.json(orders);
  } catch (err) {
    console.error('❌ Error fetching orders:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
