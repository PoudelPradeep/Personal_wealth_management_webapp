// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.use(authMiddleware); // Protect all routes below

router.post('/', addExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
