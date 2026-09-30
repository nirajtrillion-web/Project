const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving transactions',
      error: error.message,
    });
  }
});

// @desc    Add a transaction
// @route   POST /api/transactions
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    // Validation check
    if (!title || amount === undefined || !type || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, type, and category',
      });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a positive number',
      });
    }

    const transaction = await Transaction.create({
      title,
      amount: numAmount,
      type,
      category,
      date: date || Date.now(),
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error creating transaction',
      error: error.message,
    });
  }
});

// @desc    Delete a transaction
// @route   DELETE /api/transactions/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Transaction removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting transaction',
      error: error.message,
    });
  }
});

module.exports = router;
