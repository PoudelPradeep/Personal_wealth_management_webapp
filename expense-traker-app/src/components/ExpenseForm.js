import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense({ amount, description, category });
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
