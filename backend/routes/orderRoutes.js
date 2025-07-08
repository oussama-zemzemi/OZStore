// routes/orderRoutes.js
import express from 'express';
import { createOrder, getOrdersByUser } from '../controllers/orderController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Protected routes
router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrdersByUser);

export default router;
