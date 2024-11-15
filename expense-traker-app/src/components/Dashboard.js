import React, { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      <ExpenseForm onAddExpense={addExpense} />
      <h3>Your Expenses</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ${expense.amount} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
