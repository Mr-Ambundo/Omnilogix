const express = require('express');
const { body } = require('express-validator');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderStats
} = require('../controllers/orderController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const orderValidation = [
  body('customerName').trim().isLength({ min: 2, max: 100 }).withMessage('Customer name must be between 2 and 100 characters'),
  body('product').trim().isLength({ min: 2, max: 100 }).withMessage('Product must be between 2 and 100 characters'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('deliveryDate').optional().isISO8601().withMessage('Invalid delivery date')
];

const updateOrderValidation = [
  body('customerName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Customer name must be between 2 and 100 characters'),
  body('product').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Product must be between 2 and 100 characters'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('value').optional().isFloat({ min: 0 }).withMessage('Value must be a positive number'),
  body('status').optional().isIn(['pending', 'in-progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
  body('deliveryDate').optional().isISO8601().withMessage('Invalid delivery date')
];

// Routes
router.get('/', auth, getAllOrders);
router.get('/stats', auth, getOrderStats);
router.get('/:id', auth, getOrderById);
router.post('/', auth, orderValidation, createOrder);
router.put('/:id', auth, updateOrderValidation, updateOrder);
router.delete('/:id', auth, authorize('admin', 'manager'), deleteOrder);

module.exports = router;