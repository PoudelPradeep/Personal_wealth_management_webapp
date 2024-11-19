// controllers/expenseController.js
const Expense = require('../models/Expense');

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const expense = new Expense({
      userId: req.user.userId,
      name,
      amount,
      category,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!expense)
      return res.status(404).json({ error: 'Expense not found' });

    res.json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!expense)
      return res.status(404).json({ error: 'Expense not found' });

    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
