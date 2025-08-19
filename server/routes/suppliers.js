const express = require('express');
const { body } = require('express-validator');
const {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier
} = require('../controllers/supplierController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const supplierValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Supplier name must be between 2 and 100 characters'),
  body('contact').trim().isLength({ min: 2, max: 100 }).withMessage('Contact name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').trim().isLength({ min: 10, max: 20 }).withMessage('Phone must be between 10 and 20 characters'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),
  body('deliveryRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('totalOrders').optional().isInt({ min: 0 }).withMessage('Total orders must be a non-negative integer'),
  body('onTimeDeliveries').optional().isInt({ min: 0 }).withMessage('On-time deliveries must be a non-negative integer'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
];

const updateSupplierValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Supplier name must be between 2 and 100 characters'),
  body('contact').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Contact name must be between 2 and 100 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('phone').optional().trim().isLength({ min: 10, max: 20 }).withMessage('Phone must be between 10 and 20 characters'),
  body('location').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters'),
  body('deliveryRating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
  body('totalOrders').optional().isInt({ min: 0 }).withMessage('Total orders must be a non-negative integer'),
  body('onTimeDeliveries').optional().isInt({ min: 0 }).withMessage('On-time deliveries must be a non-negative integer'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
];

// Routes
router.get('/', auth, getAllSuppliers);
router.get('/:id', auth, getSupplierById);
router.post('/', auth, authorize('admin', 'manager'), supplierValidation, createSupplier);
router.put('/:id', auth, authorize('admin', 'manager'), updateSupplierValidation, updateSupplier);
router.delete('/:id', auth, authorize('admin'), deleteSupplier);

module.exports = router;