const { validationResult } = require('express-validator');
const StockItem = require('../models/StockItem');

const generateItemId = () => {
  return 'STK-' + Date.now().toString().slice(-6);
};

const getAllStockItems = async (req, res) => {
  try {
    const { search, lowStock, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { supplier: { $regex: search, $options: 'i' } },
        { itemId: { $regex: search, $options: 'i' } }
      ];
    }

    if (lowStock === 'true') {
      query.$expr = { $lt: ['$currentStock', '$minStock'] };
    }

    const stockItems = await StockItem.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await StockItem.countDocuments(query);

    res.json({
      success: true,
      stockItems,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getStockItemById = async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.json({ success: true, stockItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createStockItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const stockItemData = {
      ...req.body,
      itemId: generateItemId(),
      createdBy: req.user.id
    };

    const stockItem = await StockItem.create(stockItemData);
    await stockItem.populate('createdBy', 'name email');

    res.status(201).json({ success: true, stockItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateStockItem = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const stockItem = await StockItem.findById(req.params.id);
    
    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] !== undefined) {
        stockItem[key] = req.body[key];
      }
    });

    stockItem.lastUpdated = new Date();
    await stockItem.save();
    await stockItem.populate('createdBy', 'name email');

    res.json({ success: true, stockItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteStockItem = async (req, res) => {
  try {
    const stockItem = await StockItem.findById(req.params.id);
    
    if (!stockItem) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    await StockItem.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Stock item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await StockItem.find({
      $expr: { $lt: ['$currentStock', '$minStock'] }
    }).populate('createdBy', 'name email');

    res.json({ success: true, lowStockItems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllStockItems,
  getStockItemById,
  createStockItem,
  updateStockItem,
  deleteStockItem,
  getLowStockItems
};