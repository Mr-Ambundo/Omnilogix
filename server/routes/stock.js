const express = require('express');
const { body } = require('express-validator');
const {
  getAllStockItems,
  getStockItemById,
  createStockItem,
  updateStockItem,
  deleteStockItem,
  getLowStockItems
} = require('../controllers/stockController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const stockItemValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Item name must be between 2 and 100 characters'),
  body('currentStock').isInt({ min: 0 }).withMessage('Current stock must be a non-negative integer'),
  body('minStock').isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
  body('maxStock').isInt({ min: 1 }).withMessage('Maximum stock must be a positive integer'),
  body('unit').trim().isLength({ min: 1, max: 20 }).withMessage('Unit must be between 1 and 20 characters'),
  body('supplier').trim().isLength({ min: 2, max: 100 }).withMessage('Supplier must be between 2 and 100 characters')
];

const updateStockItemValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Item name must be between 2 and 100 characters'),
  body('currentStock').optional().isInt({ min: 0 }).withMessage('Current stock must be a non-negative integer'),
  body('minStock').optional().isInt({ min: 0 }).withMessage('Minimum stock must be a non-negative integer'),
  body('maxStock').optional().isInt({ min: 1 }).withMessage('Maximum stock must be a positive integer'),
  body('unit').optional().trim().isLength({ min: 1, max: 20 }).withMessage('Unit must be between 1 and 20 characters'),
  body('supplier').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Supplier must be between 2 and 100 characters')
];

// Routes
router.get('/', auth, getAllStockItems);
router.get('/low-stock', auth, getLowStockItems);
router.get('/:id', auth, getStockItemById);
router.post('/', auth, authorize('admin', 'manager'), stockItemValidation, createStockItem);
router.put('/:id', auth, authorize('admin', 'manager'), updateStockItemValidation, updateStockItem);
router.delete('/:id', auth, authorize('admin'), deleteStockItem);

module.exports = router;