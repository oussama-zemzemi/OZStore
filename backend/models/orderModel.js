// models/orderModel.js
import db from '../config/db.js';

// Create a new order, returns inserted order ID
export const createOrder = async (userId, totalAmount) => {
  const [result] = await db.query(
    'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
    [userId, totalAmount]
  );
  return result.insertId;
};

// Insert multiple order items linked to an order
export const insertOrderItems = async (orderId, items) => {
  // items: array of { product_id, quantity }
  const orderItems = items.map(item => [orderId, item.product_id, item.quantity]);
  const [result] = await db.query(
    'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
    [orderItems]
  );
  return result.affectedRows;
};

// Fetch all orders for a user
export const findOrdersByUserId = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

// Fetch order items by order ID
export const findOrderItemsByOrderId = async (orderId) => {
  const [rows] = await db.query(
    `SELECT oi.*, p.name, p.price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );
  return rows;
};

// Optional: get full order details including items for user
export const findOrderDetailsByUserId = async (userId) => {
  const orders = await findOrdersByUserId(userId);
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const items = await findOrderItemsByOrderId(order.id);
      return { ...order, items };
    })
  );
  return ordersWithItems;
};
