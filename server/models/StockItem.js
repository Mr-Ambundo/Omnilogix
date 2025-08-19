const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  currentStock: {
    type: Number,
    required: [true, 'Current stock is required'],
    min: [0, 'Stock cannot be negative']
  },
  minStock: {
    type: Number,
    required: [true, 'Minimum stock is required'],
    min: [0, 'Minimum stock cannot be negative']
  },
  maxStock: {
    type: Number,
    required: [true, 'Maximum stock is required'],
    min: [1, 'Maximum stock must be at least 1']
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true
  },
  supplier: {
    type: String,
    required: [true, 'Supplier is required']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Validate that maxStock is greater than minStock
stockItemSchema.pre('save', function(next) {
  if (this.maxStock <= this.minStock) {
    next(new Error('Maximum stock must be greater than minimum stock'));
  }
  next();
});

module.exports = mongoose.model('StockItem', stockItemSchema);