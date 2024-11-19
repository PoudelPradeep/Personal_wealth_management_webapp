// controllers/expenseController.js
const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res, next) => {
  try {
    const { name, amount, category } = req.body;
    const expense = new Expense({
      userId: req.user.userId,
      name,
      amount,
      category,
    });
    await expense.save();
    res.status(201).json({ success: true, expense });
  } catch (error) {
    next(error);
  }
};

// Get all expenses for a user
exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId });
    res.json({ success: true, expenses });
  } catch (error) {
    next(error);
  }
};

// Update an expense
exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, expense });
  } catch (error) {
    next(error);
  }
};

// Delete an expense
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    next(error);
  }
};
